'''
Business: API для работы с маршрутами автобусов - получение списка, деталей и обновление
Args: event - dict с httpMethod, body, queryStringParameters, pathParams
      context - объект с атрибутами request_id, function_name
Returns: HTTP response dict со списком маршрутов или деталями
'''

import json
import os
import psycopg2
from typing import Dict, Any, List, Optional

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def get_all_routes() -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cur = conn.cursor()
    
    cur.execute("""
        SELECT r.id, r.number, r.name, r.color, r.type, 
               COUNT(s.id) as stops_count,
               MAX(s.time) as duration
        FROM routes r
        LEFT JOIN stops s ON r.id = s.route_id
        GROUP BY r.id, r.number, r.name, r.color, r.type
        ORDER BY CAST(r.number AS INTEGER)
    """)
    
    routes = []
    for row in cur.fetchall():
        routes.append({
            'id': row[0],
            'number': row[1],
            'name': row[2],
            'color': row[3],
            'type': row[4],
            'stops': row[5],
            'duration': row[6] or 'N/A'
        })
    
    cur.close()
    conn.close()
    return routes

def get_route_by_number(route_number: str) -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    cur = conn.cursor()
    
    cur.execute("""
        SELECT id, number, name, color, type
        FROM routes
        WHERE number = %s
    """, (route_number,))
    
    route_row = cur.fetchone()
    if not route_row:
        cur.close()
        conn.close()
        return None
    
    route = {
        'id': route_row[0],
        'number': route_row[1],
        'name': route_row[2],
        'color': route_row[3],
        'type': route_row[4]
    }
    
    cur.execute("""
        SELECT id, name, time, position
        FROM stops
        WHERE route_id = %s
        ORDER BY position
    """, (route['id'],))
    
    stops = []
    for stop_row in cur.fetchall():
        stops.append({
            'id': stop_row[0],
            'name': stop_row[1],
            'time': stop_row[2],
            'position': stop_row[3]
        })
    
    route['stops'] = stops
    
    cur.close()
    conn.close()
    return route

def update_route(route_number: str, data: Dict[str, Any]) -> bool:
    conn = get_db_connection()
    cur = conn.cursor()
    
    cur.execute("SELECT id FROM routes WHERE number = %s", (route_number,))
    route_row = cur.fetchone()
    if not route_row:
        cur.close()
        conn.close()
        return False
    
    route_id = route_row[0]
    
    if 'name' in data:
        cur.execute("""
            UPDATE routes 
            SET name = %s, updated_at = CURRENT_TIMESTAMP 
            WHERE id = %s
        """, (data['name'], route_id))
    
    conn.commit()
    cur.close()
    conn.close()
    return True

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        route_number = params.get('number')
        
        if route_number:
            route = get_route_by_number(route_number)
            if route:
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(route, ensure_ascii=False),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Route not found'}, ensure_ascii=False),
                    'isBase64Encoded': False
                }
        else:
            routes = get_all_routes()
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(routes, ensure_ascii=False),
                'isBase64Encoded': False
            }
    
    if method == 'PUT':
        params = event.get('queryStringParameters') or {}
        route_number = params.get('number')
        
        if not route_number:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Route number is required'}, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        body_data = json.loads(event.get('body', '{}'))
        success = update_route(route_number, body_data)
        
        if success:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Route updated successfully'}, ensure_ascii=False),
                'isBase64Encoded': False
            }
        else:
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Route not found'}, ensure_ascii=False),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}, ensure_ascii=False),
        'isBase64Encoded': False
    }

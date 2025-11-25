'''
Business: API для управления остановками маршрутов - добавление, обновление, удаление
Args: event - dict с httpMethod, body, queryStringParameters
      context - объект с атрибутами request_id, function_name
Returns: HTTP response dict с результатом операции
'''

import json
import os
import psycopg2
from typing import Dict, Any

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def add_stop(route_id: int, name: str, time: str, position: int) -> Dict[str, Any]:
    conn = get_db_connection()
    cur = conn.cursor()
    
    cur.execute("""
        INSERT INTO stops (route_id, name, time, position)
        VALUES (%s, %s, %s, %s)
        RETURNING id, route_id, name, time, position
    """, (route_id, name, time, position))
    
    row = cur.fetchone()
    stop = {
        'id': row[0],
        'route_id': row[1],
        'name': row[2],
        'time': row[3],
        'position': row[4]
    }
    
    conn.commit()
    cur.close()
    conn.close()
    return stop

def update_stop(stop_id: int, data: Dict[str, Any]) -> bool:
    conn = get_db_connection()
    cur = conn.cursor()
    
    updates = []
    values = []
    
    if 'name' in data:
        updates.append('name = %s')
        values.append(data['name'])
    
    if 'time' in data:
        updates.append('time = %s')
        values.append(data['time'])
    
    if 'position' in data:
        updates.append('position = %s')
        values.append(data['position'])
    
    if not updates:
        cur.close()
        conn.close()
        return False
    
    updates.append('updated_at = CURRENT_TIMESTAMP')
    values.append(stop_id)
    
    query = f"UPDATE stops SET {', '.join(updates)} WHERE id = %s"
    cur.execute(query, values)
    
    affected = cur.rowcount
    conn.commit()
    cur.close()
    conn.close()
    
    return affected > 0

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        route_id = body_data.get('route_id')
        name = body_data.get('name')
        time = body_data.get('time', '')
        position = body_data.get('position')
        
        if not route_id or not name or position is None:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Missing required fields'}, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        stop = add_stop(route_id, name, time, position)
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(stop, ensure_ascii=False),
            'isBase64Encoded': False
        }
    
    if method == 'PUT':
        params = event.get('queryStringParameters') or {}
        stop_id = params.get('id')
        
        if not stop_id:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Stop ID is required'}, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        body_data = json.loads(event.get('body', '{}'))
        success = update_stop(int(stop_id), body_data)
        
        if success:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Stop updated successfully'}, ensure_ascii=False),
                'isBase64Encoded': False
            }
        else:
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Stop not found or no changes'}, ensure_ascii=False),
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

CREATE TABLE IF NOT EXISTS routes (
  id SERIAL PRIMARY KEY,
  number VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  color VARCHAR(7) DEFAULT '#0EA5E9',
  type VARCHAR(20) DEFAULT 'regular',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stops (
  id SERIAL PRIMARY KEY,
  route_id INTEGER NOT NULL REFERENCES routes(id),
  name VARCHAR(255) NOT NULL,
  time VARCHAR(50),
  position INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_stops_route_id ON stops(route_id);
CREATE INDEX IF NOT EXISTS idx_stops_position ON stops(route_id, position);

INSERT INTO routes (number, name, color, type) VALUES
('1', 'Центр — Жовтневый', '#0EA5E9', 'regular'),
('5', 'Вокзал — Острая Могила', '#10B981', 'express'),
('12', 'ЦУМ — Артёмовский', '#F59E0B', 'regular'),
('23', 'Центр — Южный', '#EF4444', 'express'),
('34', 'Площадь Героев — Каменный Брод', '#8B5CF6', 'regular'),
('45', 'Вокзал — Металлист', '#06B6D4', 'regular')
ON CONFLICT (number) DO NOTHING;

INSERT INTO stops (route_id, name, time, position) VALUES
(1, 'Площадь Героев', 'Начало', 1),
(1, 'Улица Оборонная', '3 мин', 2),
(1, 'Проспект Ленина', '7 мин', 3),
(1, 'ЦУМ', '12 мин', 4),
(1, 'Театр', '15 мин', 5),
(1, 'Парк Горького', '20 мин', 6),
(1, 'Улица Советская', '25 мин', 7),
(1, 'Жовтневый район', '45 мин', 8),

(2, 'Автовокзал', 'Начало', 1),
(2, 'Улица Титова', '4 мин', 2),
(2, 'Центральный рынок', '10 мин', 3),
(2, 'Проспект Победы', '18 мин', 4),
(2, 'Острая Могила', '35 мин', 5),

(3, 'ЦУМ', 'Начало', 1),
(3, 'Улица Коцюбинского', '5 мин', 2),
(3, 'Парк Дружбы', '12 мин', 3),
(3, 'Университет', '18 мин', 4),
(3, 'Артёмовский район', '40 мин', 5),

(4, 'Площадь Героев', 'Начало', 1),
(4, 'Улица Ленина', '5 мин', 2),
(4, 'Южный квартал', '15 мин', 3),
(4, 'Южный район', '30 мин', 4),

(5, 'Площадь Героев', 'Начало', 1),
(5, 'Центральный парк', '8 мин', 2),
(5, 'Улица Шевченко', '15 мин', 3),
(5, 'Проспект Мира', '25 мин', 4),
(5, 'Каменный Брод', '50 мин', 5),

(6, 'Автовокзал', 'Начало', 1),
(6, 'Улица Краснодонская', '6 мин', 2),
(6, 'Парк Молодёжный', '14 мин', 3),
(6, 'Стадион', '22 мин', 4),
(6, 'Металлист', '38 мин', 5);
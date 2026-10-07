// Prueba de las fechas y comparaciones del hub de tráfico:  node --test src/lib/traffic.test.mjs
import assert from "node:assert/strict"
import test from "node:test"
import { change, localMidnight, weekDates } from "./traffic.mjs"

test("la semana medida son los 7 días completos anteriores a hoy (hora de Tijuana)", () => {
  // 6 oct 2026, 20:00 en Tijuana (PDT, UTC-7) = 7 oct 03:00 UTC: en Tijuana todavía es 6 de octubre
  const now = Date.UTC(2026, 9, 7, 3, 0, 0)
  assert.deepEqual(weekDates(now), ["2026-09-29", "2026-09-30", "2026-10-01", "2026-10-02", "2026-10-03", "2026-10-04", "2026-10-05"])
})

test("la medianoche de Tijuana cuenta el horario de verano", () => {
  const now = Date.UTC(2026, 9, 7, 3, 0, 0)
  assert.equal(localMidnight(0, now), Date.UTC(2026, 9, 6, 7, 0, 0)) // PDT: UTC-7
  // 1 nov 2026 ya es horario de invierno (PST, UTC-8): el cambio fue el 1 de noviembre a las 2:00
  const winter = Date.UTC(2026, 10, 10, 20, 0, 0)
  assert.equal(localMidnight(0, winter), Date.UTC(2026, 10, 10, 8, 0, 0))
  // cruzando el cambio de hora: hace 10 días desde el 5 nov sigue siendo medianoche local (UTC-7 el 26 oct)
  assert.equal(localMidnight(10, Date.UTC(2026, 10, 5, 20, 0, 0)), Date.UTC(2026, 9, 26, 7, 0, 0))
})

test("el cambio contra la semana anterior", () => {
  assert.equal(change(150, 100), 50)
  assert.equal(change(50, 100), -50)
  assert.equal(change(0, 100), -100)
  assert.equal(change(10, 0), null, "sin semana anterior no hay comparación")
})

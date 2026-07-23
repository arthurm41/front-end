const assert = require('assert');
const { sensoresIniciais, filtrarSensores, atualizarValoresSensores } = require('./script.js');

assert.ok(Array.isArray(sensoresIniciais), 'Dataset inicial deve existir');

const temperatura = filtrarSensores(sensoresIniciais, 'Temperatura');
assert.ok(temperatura.every((sensor) => sensor.tipo === 'Temperatura'));

const todos = filtrarSensores(sensoresIniciais, 'Todos');
assert.equal(todos.length, sensoresIniciais.length);

const snapshot = sensoresIniciais.map((sensor) => ({ ...sensor }));
const atualizados = atualizarValoresSensores([...sensoresIniciais]);
assert.ok(atualizados.some((sensor, index) => sensor.valor !== snapshot[index].valor));

console.log('Tests passed');

var Table = require('cli-table2');
var table = new Table();

table.push(
    { 'Some key': 'Some value' }
  , { 'Another key': 'Another value' }, { 'Another key': 'Another valueAnother valueAnother valueAnother valueAnother valueAnother valueAnother valueAnother valueAnother valueAnother valueAnother valueAnother valueAnother valueAnother value' }, { 'Another key': 'Another value' }, { 'Another key': 'Another value' }, { 'Another key': 'Another value' }
);

console.log(table.toString());

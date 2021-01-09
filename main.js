$(document).ready(function() {

    var grid = [];
    var coll = []; //колонка
    var field = []; //поле
    var row = [];
    var rows = $('.sudoku').children().children().children();
    var pos_row, pos_cell;
    var arr = [
        ['', 9, 3, '', 7, 4, '', '', 1],
        ['', 1, '', 5, '', '', 9, '', ''],
        [4, 5, '', '', '', 8, '', '', 3],

        [6, 7, '', '', '', 9, 2, 3, 5],
        [9, '', '', '', '', '', '', '', 4],
        [1, 4, 2, 7, '', '', '', 6, 9],

        [7, '', '', 3, '', '', '', 9, 2],
        ['', '', 9, '', '', 1, '', 7, ''],
        [3, '', '', 8, 9, '', 4, 5, ''],
    ];
    $(".push").click(function(event) {
        var rows = $('.sudoku').children().children().children();
        for (var i = 0; i < rows.length; i++) {
            for (var j = 0; j < rows[i].cells.length; j++) {
                rows[i].cells[j].children[0].value = arr[i][j];
            }
        }
    });
    $('.question').click(function(event) {
        help();
    });

    function help() {

    }


    $('.sudoku').append(getTable());

    $(".cel").click(function() {
        var mas_gor1=[];
        var mas_vert = [];
        var mas_vert1=[];
        var mas_gor = [];
        var curent = $(this).parent()[0];
        var current_row = $(this).parent().parent()[0];
        var trs = $(this).parent().parent().children();
        var array_rows = $('.sudoku').children().children().children();
         for (var i = 0; i < array_rows.length; i++) {
            for (var j = 0; j < array_rows[i].cells.length; j++) {
                var value = array_rows[i].cells[j].children[0].value;
                row.push(value);
            }
            grid.push(row);
            // console.log(row);
            row = [];
        }
        for (var i = 0; i < array_rows.length; i++) {
            if (array_rows[i] == current_row) {
                pos_row = i;
                mas_gor = current_row.children;
                for(k=0;k<mas_gor.length;k++){
                    mas_gor1.push(mas_gor[k].children[0].value);
                }
                // console.log(mas_gor1);
                // console.log(mas_gor+'uuu');
                break;
            }
        }
        //**********************************
        for (var i = 0; i < trs.length; i++) {
            if (trs[i] == curent) {
                pos_cell = i;
                mas_vert=trs[pos_cell];
                break;

            }
        }
        for (var i = 0; i < array_rows.length; i++) {
            mas_vert = array_rows[i].children[pos_cell].children[0].value;
            mas_vert1.push(mas_vert);
        }
        var big_cells = get_big_cell(pos_row, pos_cell);
        var mas_kub =  getKub(big_cells.top, big_cells.left, grid);
        console.log(array_rows.parent()[0].children);
        console.log(mas_kub);
        console.log("mas_vert");
        console.log(mas_vert1);
        console.log("mas_gor");
        console.log(mas_gor1);
        console.log("mas_kub");
        console.log(mas_kub);
        console.log(pos_cell + 'kol');
        console.log(pos_row + 'str');
        console.log('кандидаты:');
        console.log(get_candidates(mas_vert1, mas_gor1,mas_kub));

        // console.log(array_rows[i]);
        //  for(var i=0;i<array_rows.length;i++){
        //     for(j=0;j<array_rows[i].children.length;j++){
        //         if(!!!array_rows[i][j]){
        //             console.log('кандидаты:');
        //             console.log(get_candidates(mas_vert1, mas_gor1,mas_kub));
        //         }
        //     }
        // }

    });

    function koordinats(pos_cell, pos_row) {
        var p_row = $('.sudoku').children().children().children();
        var stroka = p_row[pos_row];
        var kolonka = stroka.children[pos_cell];
        kolonka.children[0].focus();
    }
    document.onkeydown = checkKey;

    function checkKey(e) {


        e = e || window.event;

        if (e.keyCode == '38') {
            pos_row += -1;
            koordinats(pos_cell, pos_row);
            console.log('вверх');
        } else if (e.keyCode == '40') {
            pos_row += 1;
            koordinats(pos_cell, pos_row);
            console.log('вниз');
        } else if (e.keyCode == '37') {
            pos_cell += -1;
            koordinats(pos_cell, pos_row);
            console.log('слева');
        } else if (e.keyCode == '39') {
            pos_cell += 1;
            koordinats(pos_cell, pos_row);
            console.log('справа');
        }

    }

    $(".cel").keypress(function(event) {
        $(this).val("");
        event = event || window.event;
        if (event.charCode && event.charCode != 0 && event.charCode != 46 && (event.charCode < 49 || event.charCode > 57))
            return false;
    });

    $('.tst').click(function(event) {
        var rows = $('.sudoku').children().children().children();
        for (var i = 0; i < rows.length; i++) {
            for (var j = 0; j < rows[i].cells.length; j++) {
                var value = rows[i].cells[j].children[0].value;
                row.push(value);
            }
            grid.push(row);
            // console.log(row);
            row = [];
        }
        analyze(grid);
        grid = [];
    });

    function getTable() {
        var out = '<table>'
        for (var i = 0; i <= 8; i++) {
            if (i == 2 || i == 5)
                out += '<tr class="tolst">';
            else
                out += '<tr>';
            for (var k = 0; k <= 8; k++) {
                if (k == 2 || k == 5)
                    out += '<td class="tolsti"><input type="text" class="cel" ></td>';
                else if (i == 4 && k == 7)
                    out += '<td class="testing"><input type="text" class="cel" ></td>'; //+coll[i][k];//+'</td>';
                else
                    out += '<td><input type="text" class="cel" ></td>'; //+coll[i][k];//+'</td>';
            }
            out += '</tr>';
        }
        return out += '</table>';
    }

    function analyze(grid) {
        console.log(grid);
        for (var i = 0; i < grid.length; i++) { //это фор по строкам
            //тут фор по ячейкам 
            for (j = 0; j < grid[i].length; j++) {
                //тут нужно проверять ячейки на пустоту
                //если ячека пустая, то 
                if (!!!grid[i][j]) {
                    //создать obj,
                    var obj = {
                        cand: [],
                        row: i,
                        cell: j
                    };
                    obj.row = i;
                    obj.cell = j;
                    var gor = grid[i];
                    var vert = [];
                    var kub = [];

                    for (var k = 0; k < grid.length; k++) {
                        vert.push(grid[k][j]);
                    }
                    var big_cells = get_big_cell(i, j);
                    kub = getKub(big_cells.top, big_cells.left, grid);
                    var candidat = get_candidates(vert, gor, kub);
                    if (candidat.length == 1) {
                        obj.cand = candidat;
                        insertCand(obj, grid);
                        console.log('передали obj' + 'iiii' + get_candidates(vert, gor, kub));




                    } else console.log('не нашли кандидатов для obj');

                }
                // console.log(grid);

            }



            //передать в функцию 3 массива (горизонталь, вертикаль и маленький 3х3)
            //функция должна вернуть кандидатов,
            //передать в функцию insertCand заполненный obj.

        }
    }

    function get_big_cell(i, j) {
        var top, left;
        if (i < 3) {
            left = 0;
        } else if (i > 5) {
            left = 2;
        } else {
            left = 1;
        }

        if (j < 3) {
            top = 0;
        } else if (j > 5) {
            top = 2;
        } else {
            top = 1;
        }
        return { top, left };
    }

    function    getKub(top, left, grid) {
        var out = [];
        var rows_left, cells_top;
        switch (top) {
            case 0:
                cells_top = [0, 1, 2];
                break;
            case 1:
                cells_top = [3, 4, 5];
                break;
            case 2:
                cells_top = [6, 7, 8];
                break;
            default:
                cells_top = 'error cells top';
                break;
        }
        switch (left) {
            case 0:
                rows_left = [0, 1, 2];
                break;
            case 1:
                rows_left = [3, 4, 5];
                break;
            case 2:
                rows_left = [6, 7, 8];
                break;
            default:
                rows_left = 'error rows left';
                break;
        }
        for (var stroka = 0; stroka < rows_left.length; stroka++) {
            for (var kolonka = 0; kolonka < cells_top.length; kolonka++) {
                 // console.log(grid);
                // console.log(grid[rows_left[stroka]].children[cells_top[kolonka]]);
                var test_var = grid[rows_left[stroka]][cells_top[kolonka]]//.children[0].value;
                // console.log(rows_left[stroka]);
                // console.log(cells_top[kolonka]);
                // console.log('--------------');
                // // console.log(grid[rows_left[stroka]].children[5].children[0].value);
                // console.log(grid[rows_left[stroka]].children[cells_top[kolonka]].children[0].value);
                // console.log('--------------');
                out.push(test_var); 
            }
        }
        console.log(grid);
        return out;
    }

    function get_candidates(vert, gor, kub) {
        var etalon = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var cand_vert, cand_gor, cand_kub = [];
        for (var ar = 0; ar < vert.length; ar++) {
            for (var e = 0; e < etalon.length; e++) {
                if (etalon[e] == vert[ar]) {
                    etalon.splice(e, 1);
                }
            }
        }
        cand_vert = etalon;
        etalon = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (var ar = 0; ar < gor.length; ar++) {
            for (var e = 0; e < etalon.length; e++) {
                if (etalon[e] == gor[ar]) {
                    etalon.splice(e, 1);
                }
            }
        }
        cand_gor = etalon;
        etalon = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        for (var ar = 0; ar < kub.length; ar++) {
            for (var e = 0; e < etalon.length; e++) {
                if (etalon[e] == kub[ar]) {
                    etalon.splice(e, 1);
                }
            }
        }
        cand_kub = etalon;
        etalon = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        var result = cand_vert.filter(function(v) {
            return cand_gor.some(function(v2) {
                return v == v2;
            })
        });

        var res = result.filter(function(index) {
            return cand_kub.some(function(v2) {
                return index == v2;
            })
        });
        return res;
    }

    function insertCand(obj, grid) {
        console.log(obj);
        var rows = $('.sudoku').children().children().children();
        rows[obj.row].cells[obj.cell].children[0].value = obj.cand[0];
        grid[obj.row][obj.cell] = obj.cand[0];
    }
    // $('.help').click(function(event) {
    //     // .innerHTML();
    // });
});
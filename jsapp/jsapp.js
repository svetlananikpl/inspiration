$(function () {
    $.getJSON('data/100_complex.json', function (data) {

        data.forEach(function (item) {
            $('#data_complex').append('<tr><td>' + item.id + '</td>' +
                '<td>' + item.name + '</td>' +
                '<td>' + item.gender + '</td>' +
                '<td>' + item.age + '</td>' +
                '<td>' + item.address.state + ", " + item.address.city + '</td></tr>');
        });
    });
});

var grid = document.getElementById('data_complex');
var sortingFlag = {
    columnIndex: null,
    asc: null
};
function resetStyles() {
    thList = grid.getElementsByTagName('th');
    for (i = 0; i < thList.length; i++) {
        thList[i].style.removeProperty('background');
    }
}
grid.onclick = function (e) {
    if (e.target.tagName != 'TH') return;
    if(sortingFlag.columnIndex != e.target.cellIndex) {
        resetStyles();
        sortingFlag.asc = true;
        sortingFlag.columnIndex = e.target.cellIndex;
    } else {
        sortingFlag.asc = !sortingFlag.asc;
    }
    e.target.style.background = "#5bc0de";
    sortGrid();
};

function sortGrid() {
    var colNum = sortingFlag.columnIndex;
    var way = sortingFlag.asc;
    if(colNum != null) {
        var tbody = grid.getElementsByTagName('tbody')[0];
        var rowsArray = [].slice.call(tbody.rows);
        var compare;

        switch (colNum) {
            case 0:
            case 3:
                compare = function (rowA, rowB) {
                    if (!way) {
                        return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
                    } else {
                        return rowB.cells[colNum].innerHTML - rowA.cells[colNum].innerHTML;
                    }
                };
                break;
            case 1:
            case 2:
            case 4:
                compare = function (rowA, rowB) {
                    if (!way) {
                        return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
                    } else return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? -1 : 1;
                };
                break;
        }

        rowsArray.sort(compare);

        grid.removeChild(tbody);

        for (var i = 0; i < rowsArray.length; i++) {
            tbody.appendChild(rowsArray[i]);
        }
        grid.appendChild(tbody);
    }
}

function searchInput(searchLoc) {
    search = document.getElementById(searchLoc).value;
    if (!search) {
        return;
    }
    search = search.toString().toLowerCase();
    console.log(search);
    grid.removeChild(grid.getElementsByTagName('tbody')[0]);
    $(function () {
        $.getJSON('data/100_complex.json', function (data) {

            data.forEach(function (item) {
                var found = false;
                found = foundFunction(item, search);
                if (found) {
                    $('#data_complex').append('<tr><td>' + item.id + '</td>' +
                        '<td>' + item.name + '</td>' +
                        '<td>' + item.gender + '</td>' +
                        '<td>' + item.age + '</td>' +
                        '<td>' + item.address.state + ", " + item.address.city + '</td></tr>');

                }
            });

            function foundFunction(item, search) {
                var found = false;
                Object.keys(item).forEach(function (key) {
                    if (typeof item[key] == 'object') {
                        if (foundFunction(item[key], search)) {
                            found = true;
                        }
                    }
                    else if (String(item[key]).toLowerCase().indexOf(search) !== -1) {
                        console.log(search);
                        found = true;
                    }
                });
                return found;
            }
        });
    });

}

function filteringInput() {
    var id = +document.getElementById('Id').value;
    var name = document.getElementById('Name').value.toString().toLowerCase();
    var gender = document.getElementById('Gender').value.toString().toLowerCase();
    var greaterThanAge = +document.getElementById('greaterThanAge').value;
    var lessThanAge = +document.getElementById('lessThanAge').value;
    var address = document.getElementById('Address').value.toString().toLowerCase();

    grid.removeChild(grid.getElementsByTagName('tbody')[0]);

    $(function () {
        $.getJSON('data/100_complex.json', function (data) {

            data.forEach(function changeGender(row) {
                row.gender = row.gender === 'male' ? '1' : '2';
            });


            data.forEach(function (item) {
                var found = true;
                if (id) {
                    if (item.id != id) {
                        found = false;
                    }
                }

                if (name) {
                    if (item.name.toLowerCase().indexOf(name) == -1) {
                        found = false;
                    }
                }

                if (gender) {
                    if (item.gender.toLowerCase().indexOf(gender) == -1) {
                        found = false;
                    }
                }

                if (greaterThanAge || lessThanAge) {
                    if (lessThanAge) {
                        if (item.age < greaterThanAge || item.age > lessThanAge) {
                            found = false;
                        }
                    } else {
                        if (item.age < greaterThanAge) {
                            found = false;
                        }
                    }
                }

                if (address) {
                    if (item.address.state.toLowerCase().indexOf(address) == -1 && item.address.city.toLowerCase().indexOf(address) == -1) {
                        found = false;
                    }
                }

                if (found) {
                    $('#data_complex').append('<tr><td>' + item.id + '</td>' +
                        '<td>' + item.name + '</td>' +
                        '<td>' + (item.gender == '1' ? 'male' : 'female') + '</td>' +
                        '<td>' + item.age + '</td>' +
                        '<td>' + item.address.state + ", " + item.address.city + '</td></tr>');

                }
            });
        })
    });
    setTimeout(sortGrid, 500);

}
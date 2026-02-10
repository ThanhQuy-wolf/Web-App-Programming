$(document).ready(() => {
    let students = [
        { id: 1, name: "Bob", gpa: 3.6 },
        { id: 2, name: "Alex", gpa: 2.0 },
        { id: 3, name: "Dustin", gpa: 3.0 },
    ];

    $("#btn-save").hide();

    const displayStudent = function () {
        $("#tbody").html("");
        students.forEach((s) => {
            $("#tbody").append(`
            <tr data-id="${s.id}">
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.gpa}</td>
                    <td>
                        <button class="btn btn-warning btn-sm btn-edit">
                            <i class="fa fa-pen" aria-hidden="true"></i>
                        </button>
                        <button class="btn btn-danger btn-sm btn-delete">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            `);
        });
    };

    const resetForm = () => {
        $('#frm-student').trigger('reset');
        $('#id').prop('disabled', false).focus();
        $('#btn-add').show();
        $('#btn-save').hide();
    }

    displayStudent();

    $('#btn-add').click((e) => {
        e.preventDefault();
        const student = {
            id: Number($('#id').val()),
            name: $('#name').val(),
            gpa: Number($('#gpa').val())
        }
        students.push(student);
        displayStudent();
        resetForm();
    });

    $('#btn-save').click((e) => {
        e.preventDefault();
        const editedStudent = {
            id: Number($('#id').val()),
            name: $('#name').val(),
            gpa: Number($('#gpa').val())
        }
        students = students.map(s => s.id == editedStudent.id ? editedStudent : s);
        resetForm();
        displayStudent();
    });

    $('#tbody').on('click', '.btn-edit', function() {
        let id = $(this).closest('tr').data('id');
        let student = students.find(s => s.id == id);
        $('#id').val(Number(student.id)).prop('disabled', true);
        $('#name').val(student.name);
        $('#gpa').val(Number(student.gpa));
        $('#btn-add').hide();
        $('#btn-save').show();
    });

    $('#tbody').on('click', '.btn-delete', function() {
        if(confirm("Are you sure you want to delete student")) {
            let id = $(this).closest('tr').data('id');
            students = students.filter(s => s.id != id);
            displayStudent();
        }
    });
});

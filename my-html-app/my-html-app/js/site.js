$(document).ready(() => {
	let students = [
		{ id: 125, name: 'Andy', gpa: 8.3 },
		{ id: 274, name: 'Brad', gpa: 4.9 },
		{ id: 339, name: 'Chris', gpa: 10.0 },
		{ id: 404, name: 'David', gpa: 3.2 }
	];

	$('#btn-save').hide();

	const displayStudents = () => {
		$('#tbody').html('');
		students.forEach(s => {
			$('#tbody').append(`
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
	};

	displayStudents();

	$('#btn-add').click(e => {
		e.preventDefault();
		let newStudent = {
			id: $('#id').val(),
			name: $('#name').val(),
			gpa: Number($('#gpa').val())
		};
		students.push(newStudent);
		displayStudents();
		resetForm();
	});

	$('#btn-save').click(e => {
		e.preventDefault();
		let editedStudent = {
			id: $('#id').val(),
			name: $('#name').val(),
			gpa: Number($('#gpa').val())
		};
		students = students.map(s =>
			s.id == editedStudent.id ? editedStudent : s
		);
		displayStudents();
		resetForm();
	});

	$('#tbody').on('click', '.btn-edit', function () {
		let id = $(this).closest('tr').data('id');
		let student = students.find(s => s.id == id);
		$('#id').val(student.id).prop('disabled', true);
		$('#name').val(student.name);
		$('#gpa').val(student.gpa);
		$('#btn-add').hide();
		$('#btn-save').show();
	});

	$('#tbody').on('click', '.btn-delete', function () {
		if (confirm('Are you sure you want to delete?')) {
			let id = $(this).closest('tr').data('id');
			students = students.filter(s => s.id != id);
			displayStudents();
		}
	});
});

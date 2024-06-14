document.addEventListener('DOMContentLoaded', () => {

    // alerta sino llenas el formulario

    document.getElementById('formLogin').addEventListener('submit', (e) => {
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;
        if (!email.trim() || !password.trim()) {
            e.preventDefault();
            alerta.classList.remove('d-none');
        } else {
            alerta.classList.add('d-none');
        }
    });



    // script para cargar las imagenes de los skaters
    const imgSkaters = () => {
        document.querySelectorAll('tr[data-id]').forEach(tr => {
            const id = tr.getAttribute('data-id');
            const nombre = tr.getAttribute('data-nombre');

            const div = tr.querySelector('td div');
            if (div) {
                div.style.backgroundImage = `url('../assets/img/${nombre}.jpg')`;
            }

            const nthChildStyle = document.createElement('style');
            nthChildStyle.textContent = `tbody tr:nth-child(${id}) td div {background-image: url('../assets/img/${nombre}.jpg')}`;
            document.head.appendChild(nthChildStyle);
        });
    }
    imgSkaters()

    // script para actualizar los datos del skater

    const actualizarSkater = () => {
        const btnPrimary = document.querySelector('.btn-primary');
        if (btnPrimary) {
            btnPrimary.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                    const email = document.querySelector('input[name="email"]').value;
                    const nombre = document.querySelector('input[name="nombre"]').value;
                    const password = document.querySelector('input[name="password"]').value;
                    const password2 = document.querySelector('input[name="password2"]').value;
                    const experiencia = document.querySelector('input[name="experiencia"]').value;
                    const especialidad = document.querySelector('input[name="especialidad"]').value;

                    await axios.put('/update', {
                        email,
                        nombre,
                        password,
                        password2,
                        experiencia,
                        especialidad
                    });

                    alert('Datos actualizados correctamente');
                } catch (error) {
                    console.error(error);
                    alert('No se actualizaron los datos. Hay un error: ' + error.message);
                }
            });
        }
    }
    actualizarSkater()

    // script para eliminar la cuenta del skater
    const deleteSkater = () => {
        const btnDanger = document.querySelector('.btn-danger');
        if (btnDanger) {
            btnDanger.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                    const email = document.querySelector('input[name="email"]').value;
                    await axios.delete(`/delete?email=` + email);
                    alert('Cuenta eliminada correctamente');
                    window.location.href = '/';
                } catch (error) {
                    console.error(error);
                    alert('No se pudo eliminar la cuenta. Error: ' + error.message);
                }
            });
        }
    }
    deleteSkater()

    const formListen = () => {
        const formRegistro = document.getElementById('formRegistro');
        if (formRegistro) {
            formRegistro.addEventListener('submit', async () => {

                try {
                    alert(`
                        Usuario registrado correctamente
                        
                        Ahora puedes loguearte`);

                } catch (error) {
                    console.error(error);
                    alert('No se pudo registrar el usuario. Error: ' + error.message);
                }
            });
        }
    }





});
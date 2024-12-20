(function() {
    function FloatingPanel(data) {
        const button = document.createElement('button');
        data = JSON.parse(data['panel']);  // Removed "let" here
        button.className = 'clone-button';
        button.textContent = data.title;

        Object.assign(button.style, {
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            padding: '10px 20px',
            backgroundColor: '#222222',
            color: '#008A79',
            height: '3em',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            zIndex: '1000',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
            fontWeight: '700',
            fontSize: '16px',
            lineHeight: '16.75px'
        });

        // Menambahkan efek hover
        button.addEventListener('mouseenter', function() {
            button.style.backgroundColor = '#00AB96';
            button.style.color = 'white';
            button.style.border = 'none';
        });

        button.addEventListener('mouseleave', function() {
            button.style.backgroundColor = '#222222';
            button.style.color = '#008A79';
            button.style.border = 'none';
        });

        document.body.appendChild(button);

        let panel;

        button.addEventListener('click', function() {
            if (panel) {
                panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
                return;
            }
            
            panel = document.createElement('div');
            panel.className = 'panel';
            let panelcontainer = ''
            panelcontainer = `
                <button class="close-button btn btn-danger btn-sm" style="position: absolute; top: 5px; right: 5px; width: 20px; height: 20px; padding: 0; display: flex; align-items: center; justify-content: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
                        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                    </svg>
                </button>
                <div class="d-grid">`
                JSON.parse(data.link_receive).forEach(element => {
                    panelcontainer += `<a href="${element.link_receive}" class="panel-link" style="color: #00AB96; text-decoration: none;">${element.teks}</a>`
                });
                panelcontainer += `</div>
            `;
            panel.innerHTML = panelcontainer;

            Object.assign(panel.style, {
                display: 'block',
                position: 'fixed',
                bottom: '70px',
                left: '20px',
                width: '200px',
                height: 'fit-content',
                backgroundColor: '#222222',
                border: '1px solid #ccc',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                padding: '10px',
                borderRadius: '5px',
                zIndex: '1000',
                color: 'white',
                border: 'none'
            });

            document.body.prepend(panel);

            // Event listener untuk hover pada link di panel
            const links = panel.querySelectorAll('.panel-link');
            links.forEach(link => {
                link.addEventListener('mouseenter', function() {
                    link.style.color = 'white';
                });
                link.addEventListener('mouseleave', function() {
                    link.style.color = '#00AB96';
                });
            });

            panel.querySelector('.close-button').addEventListener('click', function() {
                panel.style.display = 'none';
            });
        });
    }

    window.FloatingPanel = FloatingPanel;

    document.addEventListener('DOMContentLoaded', function () {
        let response = fetch('/api/settings')
            .then(response => response.json())
            .then(response => {
                FloatingPanel(response.data); // Pass JSON string to match initial code
            });
    });
})();

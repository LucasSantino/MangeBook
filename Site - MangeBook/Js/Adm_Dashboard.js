// Função para criar os gráficos
function createCharts() {
    const ctxLivrosEmprestados = document.getElementById('livrosMaisEmprestados').getContext('2d');
    const ctxReservas = document.getElementById('historicoReservas').getContext('2d');
    const ctxLivrosComparativo = document.getElementById('livrosComparativo').getContext('2d');

    // Novas cores escuras incluindo o verde
    const updatedColors = ['#00334e', '#8E44AD', '#C0392B', '#28A745'];

    // Gráfico de Livros Emprestados (Doughnut) com porcentagem
    const livrosEmprestadosChart = new Chart(ctxLivrosEmprestados, {
        type: 'doughnut',
        data: {
            labels: ['Livros Emprestados', 'Livros Reservados', 'Livros Atrasados', 'Livros Devolvidos'],
            datasets: [{
                label: 'Livros Emprestados',
                data: [10, 20, 15, 25], // Adicionei o valor para "Livros Devolvidos"
                backgroundColor: updatedColors,
                hoverOffset: 4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
                            const value = tooltipItem.raw;
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${tooltipItem.label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    // Gráfico de Reservas Mensais (Line) com todos os meses
    const reservasChart = new Chart(ctxReservas, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Reservas Mensais',
                data: [30, 50, 25, 40, 55, 45, 60, 70, 50, 80, 65, 75], // Adicionei dados para todos os meses
                fill: false,
                borderColor: updatedColors[0],
                tension: 0.1,
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    });

    // Gráfico Comparativo de Livros (Bar) com "Livros Devolvidos"
    const livrosComparativoChart = new Chart(ctxLivrosComparativo, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [
                {
                    label: 'Livros Emprestados',
                    data: [10, 20, 15, 30, 25, 40, 50, 60, 55, 70, 65, 80],
                    backgroundColor: updatedColors[0],
                },
                {
                    label: 'Livros Reservados',
                    data: [15, 25, 30, 20, 35, 45, 55, 50, 60, 65, 70, 75],
                    backgroundColor: updatedColors[1],
                },
                {
                    label: 'Livros Atrasados',
                    data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70],
                    backgroundColor: updatedColors[2],
                },
                {
                    label: 'Livros Devolvidos',
                    data: [20, 30, 25, 40, 45, 50, 55, 60, 65, 70, 75, 80],
                    backgroundColor: updatedColors[3], // Verde para "Livros Devolvidos"
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    });
}

// Chama a função após o carregamento da página
window.onload = createCharts;

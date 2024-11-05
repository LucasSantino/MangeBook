// Função para criar os gráficos
function createCharts() {
    const ctxLivrosEmprestados = document.getElementById('livrosMaisEmprestados').getContext('2d');
    const ctxReservas = document.getElementById('historicoReservas').getContext('2d');
    const ctxLivrosComparativo = document.getElementById('livrosComparativo').getContext('2d');

    // Gráfico de Livros Emprestados (Doughnut)
    const livrosEmprestadosChart = new Chart(ctxLivrosEmprestados, {
        type: 'doughnut',
        data: {
            labels: ['Livros Emprestados', 'Livros Reservados', 'Livros Atrasados'],
            datasets: [{
                label: 'Livros Emprestados',
                data: [10, 20, 15],
                backgroundColor: ['#36A2EB', '#FFCD56', '#FF5733'],
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
                            return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            }
        }
    });

    // Gráfico de Reservas Mensais (Line)
    const reservasChart = new Chart(ctxReservas, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar'],
            datasets: [{
                label: 'Reservas Mensais',
                data: [30, 50, 25],
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
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

    // Gráfico Comparativo de Livros (Bar)
    const livrosComparativoChart = new Chart(ctxLivrosComparativo, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [
                {
                    label: 'Livros Emprestados',
                    data: [10, 20, 15, 30, 25, 40, 50, 60, 55, 70, 65, 80],
                    backgroundColor: '#36A2EB',
                },
                {
                    label: 'Livros Reservados',
                    data: [15, 25, 30, 20, 35, 45, 55, 50, 60, 65, 70, 75],
                    backgroundColor: '#FFCD56',
                },
                {
                    label: 'Livros Atrasados',
                    data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70],
                    backgroundColor: '#FF5733',
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
                            return tooltipItem.label + ': ' + tooltipItem.raw;
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

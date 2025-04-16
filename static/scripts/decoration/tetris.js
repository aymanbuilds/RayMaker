document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.tetris-background');

    const shapes = [
        // Classic 7
        [[0, 0], [1, 0], [2, 0], [3, 0]],             // I
        [[0, 0], [1, 0], [0, 1], [1, 1]],             // O
        [[1, 0], [0, 1], [1, 1], [2, 1]],             // T
        [[1, 0], [2, 0], [0, 1], [1, 1]],             // S
        [[0, 0], [1, 0], [1, 1], [2, 1]],             // Z
        [[0, 0], [0, 1], [0, 2], [1, 2]],             // L
        [[1, 0], [1, 1], [1, 2], [0, 2]],             // J

        // Extra funkiness
        [[0, 0], [1, 0], [1, 1], [1, 2]],             // custom hook
        [[0, 1], [1, 1], [2, 1], [2, 0]],             // reverse hook
        [[0, 0], [1, 0], [2, 0], [1, 1]],             // downward T
    ];

    const colors = ['#0ff', '#f0f', '#ff0', '#0f0', '#f66', '#66f'];

    function createTetrisShape() {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const baseX = Math.floor(Math.random() * (container.clientWidth - 100));
        const baseY = Math.floor(Math.random() * (container.clientHeight - 100));
        const color = colors[Math.floor(Math.random() * colors.length)];

        shape.forEach(([x, y]) => {
            const block = document.createElement('div');
            block.className = 'tetris-block';
            block.style.left = `${baseX + x * 20}px`;
            block.style.top = `${baseY + y * 20}px`;
            block.style.backgroundColor = color;
            block.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
            container.appendChild(block);
        });
    }

    // Generate a bunch
    for (let i = 0; i < 10; i++) {
        createTetrisShape();
    }
});
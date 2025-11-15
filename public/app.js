document.getElementById('saveTokenBtn').addEventListener('click', function() {
    const token = document.getElementById('instagramToken').value.trim();
    if (token) {
        localStorage.setItem('instagramToken', token);
        alert('تم حفظ التوكن بنجاح!');
        loadInsights();
    } else {
        alert('الرجاء إدخال التوكن أولاً.');
    }
});

async function loadInsights() {
    const token = localStorage.getItem('instagramToken');
    if (!token) {
        alert('يجب إدخال التوكن أولاً!');
        return;
    }

    try {
        const res = await fetch(`/api/insights?token=${token}`);
        const data = await res.json();

        document.getElementById('imp').innerText = data.impressions || '-';
        document.getElementById('reach').innerText = data.reach || '-';
        document.getElementById('eng').innerText = data.engagement || '-';
        document.getElementById('clicks').innerText = data.clicks || '-';

        renderChart(data.timeData);

        renderPosts(data.posts);

    } catch (error) {
        console.error('خطأ في جلب البيانات:', error);
    }
}

function renderChart(timeData) {
    const ctx = document.getElementById('timeChart').getContext('2d');
    const chartData = {
        labels: timeData.labels,
        datasets: [{
            label: 'التفاعل',
            data: timeData.engagement,
            borderColor: '#FF8C00',
            fill: false
        }]
    };
    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: { responsive: true, interaction: { mode: 'index', intersect: false } }
    });
}

function renderPosts(posts) {
    const tbody = document.querySelector('#postsTable tbody');
    tbody.innerHTML = '';
    posts.forEach(post => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${post.date}</td>
            <td>${post.engagement}</td>
            <td>${post.reach}</td>
            <td>${post.impressions}</td>
            <td>${post.clicks}</td>
        `;
        tbody.appendChild(tr);
    });
}
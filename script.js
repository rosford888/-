const products = [
  { name: '梦巴黎·花影', price: 1680, occasion: 'party', color: 'red', badges: ['蕾丝刺绣', '支撑 C-G'], label: '刺绣套装' },
  { name: '柔雾·无钢圈', price: 780, occasion: 'daily', color: 'neutral', badges: ['轻支撑', '无钢圈'], label: '云朵触感' },
  { name: '蔚蓝海岸', price: 980, occasion: 'beach', color: 'blue', badges: ['泳装', '防晒罩衫'], label: '度假精选' },
  { name: '都会光感', price: 1180, occasion: 'daily', color: 'black', badges: ['无痕', '办公/通勤'], label: '轻塑杯型' },
  { name: '午夜歌剧', price: 2080, occasion: 'party', color: 'black', badges: ['奢华刺绣', '礼盒'], label: '限定系列' },
  { name: '晨曦瑜伽', price: 680, occasion: 'sport', color: 'blue', badges: ['运动内衣', '可拆卸胸垫'], label: '稳固支撑' },
  { name: '云端棉柔', price: 620, occasion: 'daily', color: 'neutral', badges: ['家居服', '透气棉'], label: '家居懒人套装' },
  { name: '红毯焦点', price: 1880, occasion: 'party', color: 'red', badges: ['塑形', '晚礼服内搭'], label: '提臀塑形' },
];

const stores = [
  { city: 'shanghai', name: '上海新天地概念店', services: ['fitting', 'pickup'], address: '上海市黄浦区湖滨路 168 号', hours: '10:00 - 22:00' },
  { city: 'beijing', name: '北京三里屯旗舰店', services: ['fitting', 'pickup', 'tailor'], address: '北京市朝阳区三里屯路 11 号', hours: '10:00 - 22:30' },
  { city: 'chengdu', name: '成都太古里体验店', services: ['pickup', 'fitting'], address: '成都市锦江区中纱帽街 8 号', hours: '10:00 - 22:00' },
  { city: 'shanghai', name: '上海浦东陆家嘴店', services: ['pickup'], address: '上海市浦东新区世纪大道 100 号', hours: '10:00 - 21:30' },
];

function priceBucket(price) {
  if (price < 800) return 'under800';
  if (price <= 1200) return '800-1200';
  if (price <= 2000) return '1200-2000';
  return 'over2000';
}

function renderProducts() {
  const occasion = document.getElementById('filter-occasion').value;
  const color = document.getElementById('filter-color').value;
  const price = document.getElementById('filter-price').value;
  const grid = document.getElementById('product-grid');

  const filtered = products.filter((item) => {
    const occasionMatch = occasion === 'all' || item.occasion === occasion;
    const colorMatch = color === 'all' || item.color === color;
    const priceMatch = price === 'all' || priceBucket(item.price) === price;
    return occasionMatch && colorMatch && priceMatch;
  });

  grid.innerHTML = '';
  filtered.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-visual">${item.label}</div>
      <div class="product-meta">
        <div>
          <div class="title">${item.name}</div>
          <div class="muted">¥${item.price.toLocaleString('zh-CN')}</div>
        </div>
        <span class="pill">${item.occasion === 'daily' ? '日常' : item.occasion === 'beach' ? '度假' : item.occasion === 'sport' ? '运动' : '晚宴'}</span>
      </div>
      <div class="badges">${item.badges.map((b) => `<span>${b}</span>`).join('')}</div>
      <button class="ghost" aria-label="加入购物袋 ${item.name}">加入购物袋</button>
    `;
    grid.appendChild(card);
  });

  if (!filtered.length) {
    grid.innerHTML = '<p class="lede">暂无符合条件的商品，试试调整筛选条件。</p>';
  }
}

function renderStores() {
  const city = document.getElementById('filter-city').value;
  const service = document.getElementById('filter-service').value;
  const list = document.getElementById('store-list');

  const filtered = stores.filter((store) => {
    const cityMatch = city === 'all' || store.city === city;
    const serviceMatch = service === 'all' || store.services.includes(service);
    return cityMatch && serviceMatch;
  });

  list.innerHTML = '';
  filtered.forEach((store) => {
    const card = document.createElement('article');
    card.className = 'store-card';
    card.innerHTML = `
      <div class="title">${store.name}</div>
      <div class="muted">${store.address}</div>
      <div class="muted">营业时间：${store.hours}</div>
      <div class="badges">${store.services.map((s) => `<span>${serviceLabel(s)}</span>`).join('')}</div>
      <button class="ghost" aria-label="预约 ${store.name}">预约服务</button>
    `;
    list.appendChild(card);
  });

  if (!filtered.length) {
    list.innerHTML = '<p class="lede">暂未找到符合条件的门店，可选择其他城市或服务。</p>';
  }
}

function serviceLabel(service) {
  if (service === 'fitting') return '试穿预约';
  if (service === 'pickup') return '到店自提';
  if (service === 'tailor') return '量体定制';
  return service;
}

function init() {
  document.querySelectorAll('#filter-occasion, #filter-color, #filter-price').forEach((select) => {
    select.addEventListener('change', renderProducts);
  });
  document.querySelectorAll('#filter-city, #filter-service').forEach((select) => {
    select.addEventListener('change', renderStores);
  });

  renderProducts();
  renderStores();
}

document.addEventListener('DOMContentLoaded', init);

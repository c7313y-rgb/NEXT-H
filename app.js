(function () {
  const state = {
    tab: 'home',
    programs: [],
    studentName: '山田 花子'
  };

  const fallbackPrograms = [
    {
      title: 'AIで未来の課題を観察しよう',
      category: '探究・俯瞰',
      description: '生成AIと観察フレームを使い、社会課題を構造化して仮説を作る導入プログラムです。'
    },
    {
      title: 'アプリ開発入門ワークショップ',
      category: '開発・デザイン',
      description: 'アイデア整理から画面設計までを短時間で体験し、プロトタイプ思考を学びます。'
    },
    {
      title: '課題解決型ビジネス創造体験',
      category: '地域・社会',
      description: '地域や学校の課題を題材に、価値提案と実装計画を立てる実践型プログラムです。'
    },
    {
      title: 'VRアプリでデータ可視化',
      category: 'グローバル・その他',
      description: '可視化と発表を組み合わせ、複数のデータから意思決定材料を整理します。'
    }
  ];

  async function loadData() {
    try {
      const res = await fetch('./data/app-data.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('data load failed');
      const json = await res.json();
      state.programs = Array.isArray(json.programs) && json.programs.length ? json.programs : fallbackPrograms;
    } catch (e) {
      state.programs = fallbackPrograms;
    }
  }

  function cardProgram(program) {
    return `
      <div class="card program-item">
        <span class="badge">${escapeHtml(program.category || 'プログラム')}</span>
        <h3>${escapeHtml(program.title || 'プログラム')}</h3>
        <p>${escapeHtml(program.description || '説明準備中')}</p>
        <button class="btn" data-action="student">生徒ページで確認</button>
      </div>
    `;
  }

  function renderHome() {
    return `
      <section class="hero">
        <div class="container hero-grid">
          <div class="card hero-copy">
            <div class="eyebrow">Education Execution OS</div>
            <h1>教育実装OS<br>副担任mirAI N-E.X.T.</h1>
            <p>企業プログラム、診断、生成AI、アーカイブを一体化した学校向けポータルです。GitHub Pagesで安定動作するよう、依存を抑えた静的構成で再構築しています。</p>
            <div class="hero-actions">
              <button class="btn btn-primary" data-tab="programs">プログラムを見る</button>
              <button class="btn" data-tab="archive">アーカイブへ</button>
              <button class="btn" data-tab="student">生徒ページへ</button>
            </div>
          </div>
          <div class="card hero-visual" aria-label="hero image"></div>
        </div>
      </section>

      <section class="section">
        <div class="container grid-3">
          <div class="card metric"><div class="label">導入カテゴリ</div><div class="value">4系統</div></div>
          <div class="card metric"><div class="label">主要導線</div><div class="value">3画面</div></div>
          <div class="card metric"><div class="label">公開方式</div><div class="value">静的配信</div></div>
        </div>
      </section>

      <section class="section">
        <div class="container grid-3">
          <div class="card feature"><h3>プログラム一覧</h3><p>カテゴリ別に授業・探究・開発テーマを確認できます。</p></div>
          <div class="card feature"><h3>外部アーカイブ連携</h3><p>アーカイブ画面から指定URLへワンクリック遷移します。</p></div>
          <div class="card feature"><h3>生徒ページ視認性改善</h3><p>文字色と背景色のコントラストを強め、読みやすさを優先しています。</p></div>
        </div>
      </section>
    `;
  }

  function renderPrograms() {
    return `
      <section class="section">
        <div class="container">
          <h2 class="section-title">プログラム一覧</h2>
          <div class="program-list">
            ${state.programs.slice(0, 6).map(cardProgram).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderArchive() {
    return `
      <section class="section">
        <div class="container">
          <div class="card archive-card">
            <div class="archive-image"></div>
            <div class="archive-copy">
              <div class="eyebrow">Archive</div>
              <h2 class="section-title">外部アーカイブ一覧へ移動</h2>
              <p style="color:var(--muted); line-height:1.9;">下のボタンをクリックすると、指定された公開ページへジャンプします。</p>
              <p style="color:var(--muted); word-break:break-all; line-height:1.8;">https://c7313y-rgb.github.io/programDX/</p>
              <a class="btn btn-primary" href="https://c7313y-rgb.github.io/programDX/" target="_blank" rel="noreferrer">アーカイブ一覧を開く</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderStudent() {
    return `
      <section class="section">
        <div class="container student-shell">
          <div class="student-header">
            <div>
              <div class="eyebrow" style="color:#2563eb;">Student Page</div>
              <h2 style="margin:8px 0 0;">${escapeHtml(state.studentName)}</h2>
            </div>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="btn btn-primary" data-tab="archive">アーカイブ</button>
              <button class="btn" data-tab="programs" style="color:#0f172a; background:#fff; border-color:rgba(15,23,42,.12)">プログラム</button>
            </div>
          </div>
          <div class="student-body">
            <p class="muted" style="margin-top:0; line-height:1.9;">生徒ページは文字と背景が明確に見分けられる高コントラスト設計に変更しています。</p>
            <div class="student-grid">
              <div class="student-box"><h3>診断状況</h3><p>興味関心、学習傾向、進路観点を横断して確認できます。</p></div>
              <div class="student-box"><h3>おすすめ授業</h3><p>プログラム一覧から生徒に合わせたテーマへ移動できます。</p></div>
              <div class="student-box"><h3>アーカイブ導線</h3><p>外部アーカイブ一覧ページへ直接ジャンプできます。</p></div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="shell">
        <header class="topbar">
          <div class="container topbar-inner">
            <div class="brand">
              <div class="brand-mark">N</div>
              <div>教育実装OS 副担任mirAI N-E.X.T.</div>
            </div>
            <nav class="nav">
              <button class="nav-btn ${state.tab === 'home' ? 'active' : ''}" data-tab="home">ホーム</button>
              <button class="nav-btn ${state.tab === 'programs' ? 'active' : ''}" data-tab="programs">プログラム</button>
              <button class="nav-btn ${state.tab === 'archive' ? 'active' : ''}" data-tab="archive">アーカイブ</button>
              <button class="nav-btn ${state.tab === 'student' ? 'active' : ''}" data-tab="student">生徒ページ</button>
            </nav>
          </div>
        </header>
        ${state.tab === 'home' ? renderHome() : ''}
        ${state.tab === 'programs' ? renderPrograms() : ''}
        ${state.tab === 'archive' ? renderArchive() : ''}
        ${state.tab === 'student' ? renderStudent() : ''}
        <footer class="footer">
          <div class="container">GitHub Pages公開向けの静的アプリ構成です。</div>
        </footer>
      </div>
    `;

    app.querySelectorAll('[data-tab]').forEach(el => {
      el.addEventListener('click', () => {
        state.tab = el.getAttribute('data-tab');
        render();
      });
    });
    app.querySelectorAll('[data-action="student"]').forEach(el => {
      el.addEventListener('click', () => {
        state.tab = 'student';
        render();
      });
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  loadData().then(render);
})();

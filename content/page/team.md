---
title: "Team"
slug: "team"
aliases:
  - /team/
  - /team/index.html
draft: false
---

<style>
.team-intro {
  text-align: center;
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  color: #24292f;
}

:root.dark .team-intro {
  background: #2d2d2d;
  border-color: #404040;
  color: #ececec;
}

:root.dark .team-intro a {
  color: #58a6ff;
}

.creator-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}

:root.dark .creator-section {
  background: #2d2d2d;
}

:root.dark .creator-section h2,
:root.dark .creator-section h3,
:root.dark .creator-section p {
  color: #ececec;
}

:root.dark .creator-section a {
  color: #58a6ff;
}

.creator-section img {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 4px solid #0969da;
}

.creator-info {
  flex: 1;
  min-width: 300px;
}

.creator-links {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.creator-links a {
  padding: 0.5rem 1rem;
  background: #0969da;
  color: white !important;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s;
}

.creator-links a:hover {
  background: #0860ca;
  color: white !important;
  transform: translateY(-2px);
}

.contributors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.contributor-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s;
  border: 2px solid #e9ecef;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

:root.dark .contributor-card {
  background: #2d2d2d;
  border-color: #404040;
}

.contributor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(9, 105, 218, 0.3);
  border-color: #0969da;
}

.contributor-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 3px solid #0969da;
}

.contributor-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: #2d3748;
}

:root.dark .contributor-name {
  color: #ececec;
}

.contributor-username {
  color: #0969da;
  text-decoration: none;
  font-weight: 600;
  margin: 0.5rem 0;
  display: inline-block;
}

.contributor-username:hover {
  text-decoration: underline;
}

.contributor-stats {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #e9ecef;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #0969da;
}

.stat-label {
  font-size: 0.8rem;
  color: #718096;
  text-transform: uppercase;
}

:root.dark .stat-label {
  color: #b4b4b4;
}

.rank-badge {
  background: linear-gradient(135deg, #60a5fa 0%, #0969da 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.section-header {
  text-align: center;
  margin: 3rem 0 2rem;
  font-size: 2rem;
  color: #2d3748;
  position: relative;
}

:root.dark .section-header {
  color: #ececec;
}

.section-header::after {
  content: '';
  display: block;
  width: 100px;
  height: 4px;
  background: linear-gradient(135deg, #60a5fa 0%, #0969da 100%);
  margin: 1rem auto;
  border-radius: 2px;
}

.maintainers-grid {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: nowrap;
}

.maintainer-card {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s;
  border: 2px solid #e9ecef;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 140px;
}

:root.dark .maintainer-card {
  background: #2d2d2d;
  border-color: #404040;
}

.maintainer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(9, 105, 218, 0.3);
  border-color: #0969da;
}

.maintainer-card a {
  text-decoration: none;
  color: inherit;
}

.maintainer-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 0.75rem;
  border: 3px solid #0969da;
}

.maintainer-name {
  font-size: 1rem;
  font-weight: bold;
  margin: 0.25rem 0;
  color: #2d3748;
}

:root.dark .maintainer-name {
  color: #ececec;
}

.maintainer-title {
  font-size: 0.75rem;
  color: #718096;
  margin: 0;
}

:root.dark .maintainer-title {
  color: #b4b4b4;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const grid = document.querySelector('.maintainers-grid');
  if (!grid) return;

  const cards = Array.from(grid.children);
  const firstCard = cards[0]; // Keep Chrissy first
  const otherCards = cards.slice(1); // Get all other maintainers

  // Shuffle the other maintainers
  for (let i = otherCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [otherCards[i], otherCards[j]] = [otherCards[j], otherCards[i]];
  }

  // Clear and rebuild: Chrissy first, then randomized others
  grid.innerHTML = '';
  grid.appendChild(firstCard);
  otherCards.forEach(card => grid.appendChild(card));
});
</script>

<div class="team-intro">
  <p>We encourage <a href="https://dbatools.io/firstpull">pull requests</a> and <a href="https://dbatools.io/contributing">development participation</a>. There's also a <a href="https://dbatools.io/slack">#dbatools channel</a> on the SQL Server Slack if you'd like to discuss the module or just hang out.</p>
</div>

<h2 class="section-header">Core Maintainers</h2>

<div class="maintainers-grid">
  <a href="https://github.com/potatoqualitee" class="maintainer-card">
    <img src="/images/lollerskate.jpg" alt="Chrissy LeMaire" class="maintainer-avatar">
    <h3 class="maintainer-name">Chrissy</h3>
    <p class="maintainer-title">Creator</p>
  </a>

  <a href="https://github.com/jpomfret" class="maintainer-card">
    <img src="https://github.com/jpomfret.png" alt="Jess Pomfret" class="maintainer-avatar">
    <h3 class="maintainer-name">Jess</h3>
    <p class="maintainer-title">Maintainer</p>
  </a>

  <a href="https://github.com/andreasjordan" class="maintainer-card">
    <img src="https://github.com/andreasjordan.png" alt="Andreas Jordan" class="maintainer-avatar">
    <h3 class="maintainer-name">Andreas</h3>
    <p class="maintainer-title">Maintainer</p>
  </a>

  <a href="https://github.com/niphlod" class="maintainer-card">
    <img src="https://github.com/niphlod.png" alt="Simone Bizzotto" class="maintainer-avatar">
    <h3 class="maintainer-name">Simone</h3>
    <p class="maintainer-title">Maintainer</p>
  </a>

  <a href="https://github.com/SQLDBAWithABeard" class="maintainer-card">
    <img src="https://github.com/SQLDBAWithABeard.png" alt="Rob Sewell" class="maintainer-avatar">
    <h3 class="maintainer-name">Rob</h3>
    <p class="maintainer-title">Maintainer</p>
  </a>

  <a href="https://github.com/wsmelton" class="maintainer-card">
    <img src="https://github.com/wsmelton.png" alt="Shawn Melton" class="maintainer-avatar">
    <h3 class="maintainer-name">Shawn</h3>
    <p class="maintainer-title">Maintainer</p>
  </a>
</div>

<h2 class="section-header">Top Contributors</h2>

<div class="contributors-grid">
  <div class="contributor-card">
    <div class="rank-badge">#1</div>
    <img src="https://github.com/potatoqualitee.png" alt="potatoqualitee" class="contributor-avatar">
    <h3 class="contributor-name">Chrissy LeMaire</h3>
    <a href="https://github.com/potatoqualitee" class="contributor-username">@potatoqualitee</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">8,919</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#2</div>
    <img src="https://github.com/wsmelton.png" alt="wsmelton" class="contributor-avatar">
    <h3 class="contributor-name">Shawn Melton</h3>
    <a href="https://github.com/wsmelton" class="contributor-username">@wsmelton</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">1,583</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#3</div>
    <img src="https://github.com/Stuart-Moore.png" alt="Stuart-Moore" class="contributor-avatar">
    <h3 class="contributor-name">Stuart Moore</h3>
    <a href="https://github.com/Stuart-Moore" class="contributor-username">@Stuart-Moore</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">828</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#4</div>
    <img src="https://github.com/niphlod.png" alt="niphlod" class="contributor-avatar">
    <h3 class="contributor-name">Simone Bizzotto</h3>
    <a href="https://github.com/niphlod" class="contributor-username">@niphlod</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">662</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#5</div>
    <img src="https://github.com/andreasjordan.png" alt="andreasjordan" class="contributor-avatar">
    <h3 class="contributor-name">Andreas Jordan</h3>
    <a href="https://github.com/andreasjordan" class="contributor-username">@andreasjordan</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">462</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#6</div>
    <img src="https://github.com/jpomfret.png" alt="jpomfret" class="contributor-avatar">
    <h3 class="contributor-name">Jess Pomfret</h3>
    <a href="https://github.com/jpomfret" class="contributor-username">@jpomfret</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">333</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#7</div>
    <img src="https://github.com/sanderstad.png" alt="sanderstad" class="contributor-avatar">
    <h3 class="contributor-name">Sander Stad</h3>
    <a href="https://github.com/sanderstad" class="contributor-username">@sanderstad</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">315</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#8</div>
    <img src="https://github.com/ClaudioESSilva.png" alt="ClaudioESSilva" class="contributor-avatar">
    <h3 class="contributor-name">Claudio Silva</h3>
    <a href="https://github.com/ClaudioESSilva" class="contributor-username">@ClaudioESSilva</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">309</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#9</div>
    <img src="https://github.com/alevyinroc.png" alt="alevyinroc" class="contributor-avatar">
    <h3 class="contributor-name">Andy Levy</h3>
    <a href="https://github.com/alevyinroc" class="contributor-username">@alevyinroc</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">204</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#10</div>
    <img src="https://github.com/MikeyBronowski.png" alt="MikeyBronowski" class="contributor-avatar">
    <h3 class="contributor-name">Mikey Bronowski</h3>
    <a href="https://github.com/MikeyBronowski" class="contributor-username">@MikeyBronowski</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">181</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#11</div>
    <img src="https://github.com/lancasteradam.png" alt="lancasteradam" class="contributor-avatar">
    <h3 class="contributor-name">Adam Lancaster</h3>
    <a href="https://github.com/lancasteradam" class="contributor-username">@lancasteradam</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">175</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#12</div>
    <img src="https://github.com/nvarscar.png" alt="nvarscar" class="contributor-avatar">
    <h3 class="contributor-name">Kirill Kravtsov</h3>
    <a href="https://github.com/nvarscar" class="contributor-username">@nvarscar</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">163</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#13</div>
    <img src="https://github.com/FriedrichWeinmann.png" alt="FriedrichWeinmann" class="contributor-avatar">
    <h3 class="contributor-name">Friedrich Weinmann</h3>
    <a href="https://github.com/FriedrichWeinmann" class="contributor-username">@FriedrichWeinmann</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">142</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#14</div>
    <img src="https://github.com/SQLDBAWithABeard.png" alt="SQLDBAWithABeard" class="contributor-avatar">
    <h3 class="contributor-name">Rob Sewell</h3>
    <a href="https://github.com/SQLDBAWithABeard" class="contributor-username">@SQLDBAWithABeard</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">121</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#15</div>
    <img src="https://github.com/joshcorr.png" alt="joshcorr" class="contributor-avatar">
    <h3 class="contributor-name">Josh Corrick</h3>
    <a href="https://github.com/joshcorr" class="contributor-username">@joshcorr</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">115</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#16</div>
    <img src="https://github.com/sqllensman.png" alt="sqllensman" class="contributor-avatar">
    <h3 class="contributor-name">Patrick Flynn</h3>
    <a href="https://github.com/sqllensman" class="contributor-username">@sqllensman</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">104</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#17</div>
    <img src="https://github.com/PowerDBAKlaas.png" alt="PowerDBAKlaas" class="contributor-avatar">
    <h3 class="contributor-name">Klaas Vandenberghe</h3>
    <a href="https://github.com/PowerDBAKlaas" class="contributor-username">@PowerDBAKlaas</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">91</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#18</div>
    <img src="https://github.com/zippy1981.png" alt="zippy1981" class="contributor-avatar">
    <h3 class="contributor-name">Justin Dearing</h3>
    <a href="https://github.com/zippy1981" class="contributor-username">@zippy1981</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">84</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#19</div>
    <img src="https://github.com/Splaxi.png" alt="Splaxi" class="contributor-avatar">
    <h3 class="contributor-name">Mötz Jensen</h3>
    <a href="https://github.com/Splaxi" class="contributor-username">@Splaxi</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">77</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>

  <div class="contributor-card">
    <div class="rank-badge">#20</div>
    <img src="https://github.com/cviorel.png" alt="cviorel" class="contributor-avatar">
    <h3 class="contributor-name">Viorel Ciucu</h3>
    <a href="https://github.com/cviorel" class="contributor-username">@cviorel</a>
    <div class="contributor-stats">
      <div class="stat">
        <span class="stat-value">76</span>
        <span class="stat-label">Commits</span>
      </div>
    </div>
  </div>
</div>

<p style="text-align: center; margin: 3rem 0; color: #718096; font-size: 1.1rem;">
  And many more amazing contributors who make dbatools better every day! 💙
</p>

<div class="creator-section">
  <img src="/images/lollerskate.jpg" alt="Chrissy LeMaire">
  <div class="creator-info">
    <h2>Chrissy LeMaire, dbatools creator</h2>
    <h3>SQL Server & PowerShell MVP</h3>
    <div class="creator-links">
      <a href="https://github.com/potatoqualitee">GitHub</a>
      <a href="https://bsky.app/profile/funbucket.dev">Bluesky</a>
      <a href="https://blog.netnerds.net">Blog</a>
      <a href="http://www.linkedin.com/in/chrissylemaire">LinkedIn</a>
      <a href="https://www.reddit.com/user/thebeersgoodnbelgium/">Reddit</a>
    </div>
    <p>Hey, I'm Chrissy. I'm a <a href="http://www.realcajunrecipes.com">Cajun</a> living in Europe and a SQL Server DBA with over 20 years of experience.</p>
    <p>I've been a fan of Linux and Open Source since I was first introduced back in the 90's, right around the time I moved to California to work in tech. I've loved SQL Server for nearly as long. And of course, PowerShell, which I've worked with since 2005.</p>
  </div>
</div>

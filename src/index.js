const app = document.getElementById('app');
const apiUrl = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';

fetchScores();

async function fetchScores()
{
    const response = await fetch(apiUrl);
    if(!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

    console.log(data);
    let events = data.events;
    console.log(events);
    
    events = events.map(event => {
        const homeTeam = event.competitions[0].competitors.find(c => c.homeAway === "home");
        const awayTeam = event.competitions[0].competitors.find(c => c.homeAway === "away");

        return `
            <div class="game">
                <h3>${event.name}</h3>
                <div class="teams">
                    <button class="team-btn"
                            data-team="${awayTeam.team.abbreviation}"
                            style="background-color: #${awayTeam.team.color}; color: #${awayTeam.team.alternateColor};">
                        ${awayTeam.team.displayName}
                    </button>
                    <button class="team-btn"
                            data-team="${homeTeam.team.abbreviation}"
                            style="background-color: #${homeTeam.team.color}; color: #${homeTeam.team.alternateColor};">
                        ${homeTeam.team.displayName}
                    </button>
                </div>
            </div>`;
    });

    console.log(events);
    app.innerHTML = events.join('');
}
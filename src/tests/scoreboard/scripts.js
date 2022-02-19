import gsap from "gsap";
import Filter from "bad-words";
const body = document.querySelector("body");
const form = document.querySelector(".form");
const scoreSubmit = document.querySelector(".submit-wrapper");
const scoreSubmitFlex = document.querySelector(".submit-flex");
const scoreDisplay = document.querySelector(".scoreboard-wrapper");
const scoreUI = document.querySelector(".score-display");
const scoreboard = document.querySelector(".scoreboard-flex");
const scoreTable = document.querySelector(".score-table");

var filter = new Filter();

let score;
let records;

fetch("/api")
  .then((response) => response.json())
  .then((data) => {
    records = data;
    score = data[0].score + 25;
    scoreUI.innerHTML = score;
    const recordCount = data.length;
    const lowScore = data[recordCount - 1].score;
    if (score > lowScore || recordCount < 25) {
      scoreSubmit.style.display = "flex";
      gsap.fromTo(
        scoreSubmit,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          delay: 1,
          duration: 1.25,
        }
      );
    } else {
      records = data;
      scoreSubmitFlex.style.display = "none";
      scoreDisplay.style.display = "block";
      gsap.fromTo(
        scoreDisplay,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          delay: 1,
          duration: 1.25,
        }
      );
    }
  })
  .catch((err) => console.log(err));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let submission = form.querySelector('input[name="name"]').value;

  if (submission.length == 0) {
    confirm("You must provide a name");
    return;
  }

  if (filter.isProfane(submission)) {
    confirm("The name you provided contains profanity. Try again.");
    return;
  }

  fetch("/api", {
    method: "POST",
    body: JSON.stringify({ name: submission, score: score }),
  });

  gsap
    .to(scoreSubmit, {
      opacity: 0,
      y: 10,
      duration: 1,
    })
    // TODO: Need to update the list first
    .then(() => {
      console.log(records);
      scoreTable.innerHTML =
        ` <tr>
          <td class="table-headers">Rank</td>
          <td class="table-headers">Score</td>
          <td class="table-headers">Name</td>
          <td class="table-headers">Level</td>
          <td class="table-headers">Date</td>
        </tr>` +
        records
          .map((record, index) => {
            return `
          <tr>
            <td>${index + 1}.</td>
            <td> ${record.score}</td>
            <td>${record.name}</td>
            <td>10</td>
            <td>12/22/22</td>
          </tr>
          `;
          })
          // Join removes commas returned by map
          .join("");
    })
    .then(() => {
      scoreSubmitFlex.style.display = "none";
      scoreDisplay.style.display = "block";
      gsap.fromTo(
        scoreboard,
        {
          opacity: 0,
          y: 10,
        },
        {
          delay: 1,
          opacity: 1,
          y: 0,
          duration: 1.25,
        }
      );
    });
});

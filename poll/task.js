

function clearScreen(Elements)
{
  for(let el of Elements)
  {
    el.parentElement.removeChild(el);
  }

}

const stringURL = 'https://students.netoservices.ru/nestjs-backend/poll'
const getReq = new XMLHttpRequest;

getReq.open('GET', stringURL);
getReq.send();
getReq.onreadystatechange = function () {
if (getReq.readyState == 4 && getReq.status == 200) {
    let data = JSON.parse(getReq.responseText).data;
    let inqueryId = JSON.parse(getReq.responseText).id;
    let divPoll = document.querySelector('div.poll');

    divPoll.insertAdjacentHTML('afterbegin',
       `<div class="poll__title" id="poll__title">${data.title}</div>`
        );

        
    for (let answer in {...data.answers}) {
        divPoll.insertAdjacentHTML('beforeend',
        `<button class="poll__answer">${{...data.answers}[answer]}</button>`
        );
    };

        
    Array.from(document.querySelectorAll('button.poll__answer')).forEach(function (btn, index) {
        btn.onclick = function (event) {
        alert('Спасибо, ваш голос засчитан!');
        const postReq = new XMLHttpRequest;
        postReq.open( 'POST', stringURL );
        postReq.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        postReq.send( `vote=${inqueryId}&answer=${++index}`);
        postReq.onreadystatechange = function () {
        // console.log(postReq.readyState,postReq.status);
            
        if (postReq.readyState == 4 && postReq.status == 201) {
            nodes = document.querySelectorAll('#poll__answers');
            clearScreen(nodes);
            let resp = Array.from(JSON.parse(postReq.responseText).stat);
            let votesAll = resp.reduce(function(prev, cur) { return prev + cur.votes }, 0);
            for (let item in resp) {
                document.querySelector('div.poll').insertAdjacentHTML('beforeend',
                `<div class="poll__answers poll__answers_active" id="poll__answers">${resp[item].answer}: <b>${(resp[item].votes / votesAll*100).toFixed(2)}%</b></div>`
                )
            }
            }
            }
            }
        }
    )
    }
}
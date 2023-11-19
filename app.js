// Тоглоомын бүх газар ашиглагдах глобаль хувьсагчдыг энд зарлая
var activePlayer;
var scores;
var roundScore;

// Тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч
var isGameOver;

// Шооны зургийг үзүүлэх элементийг DOM оос хайж олоод энд хадгаля
var diceDom = document.querySelector(".dice");

// Тоглоомыг шинээр эхлэхэд бэлтгэнэ
function initGame(){
    //Тоглоом эхэллээ гэдэг төлөвт оруулна
    isGameOver = false;

    // Тоглогчийн ээлжийг харуулах хувьсагч
    activePlayer = 0;

    // Тоглогчийн цуглуулсан оноог хадгалах хувьсагч
    scores = [0 , 0];

    // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
    roundScore = 0;

    // Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй , 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө

    //Программ эхлэхэд бэлтгэе
    document.getElementById("score-0").textContent = 0;
    document.querySelector("#score-1").textContent = 0;
    document.querySelector("#current-0").textContent = 0;
    document.querySelector("#current-1").textContent = 0;

    diceDom.style.display = "none";
}
initGame();

// Шоог шидэх эвэнт листенер
document.querySelector(".btn-roll").addEventListener('click' , function() {
    if(isGameOver === false)
    {
            // 1-6 доторх санамсаргүй нэг тоог гаргаж авна
        var diceNumber = Math.floor(Math.random()*6)+1;

        // Шооны зургийг вэб дээр гаргаж ирнэ
        diceDom.style.display = "block";

        // Буусан санамсаргүй тоог харгалзах шооны зургийг вэб дээр гаргаж ирнэ
        diceDom.src = 'dice-'+diceNumber+'.png';

        // Буусан тоо нь 1 ээс ялгаатай бол идэвхитэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
        if (diceNumber !== 1){
            // 1-ээс ялгаатай тоо буулаа
            roundScore += diceNumber;
            document.getElementById('current-'+activePlayer).textContent = roundScore;
        }
        else{
            // 1-ээс ялгаатай тоо буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.

            // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
            roundScore = 0;
            document.getElementById('current-' + activePlayer).textContent = 0;

            // Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ
            // хэрэв идэвхитэй тоглогч нь 0 байвал идэвхитэй тоглогчийг 1 болго
            // үгүй бол идэвхитэй тоглогчийг 0 болго

            activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

            // Улаан цэгийг шилжүүлэх
            // document.querySelector('.player-0-panel').classList.remove("active");
            // document.querySelector('.player-1-panel').classList.add("active");
            document.querySelector('.player-0-panel').classList.toggle("active");
            document.querySelector('.player-1-panel').classList.toggle("active");

            //Шоог түр алга болгоно
            diceDom.style.display = 'none';

            // if(activePlayer === 0) {
            //     activePlayer = 1;
            // }
            // else {
            //     activePlayer = 0;
            // }
        }
    }
    else{
        alert("Game ended! , click NEW GAME button");
    }
});

// Hold товчлуурыг ажилтай болгоё хха
document.querySelector(".btn-hold").addEventListener('click', function(){
    if(isGameOver === false)
    {
        // Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нь нэмж өгнө
    scores[activePlayer] += roundScore;
    document.getElementById('score-'+activePlayer).textContent = Math.floor(scores[activePlayer]);   

    // Уг тоглогч хожсон эсэхийг шалгая
    if(scores[activePlayer] >= 100) {
        //Тоглоомыг дууссан төлөвт оруулна
        isGameOver = true;

        document.getElementById('name-' + activePlayer).textContent = 'Winner !';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add("winner");
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove("active");
    } else{
        switchToNextPlayer(); // DRY -> Don't repeat yourself
    }
    }
    else{
        alert("Game ended! , click NEW GAME button");
    }
 
});

function switchToNextPlayer(){
    // Энэ тоглогчийн цуглуулсан оноог 0 болгоно
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;

    // Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

        // Улаан цэгийг шилжүүлэх
        document.querySelector('.player-0-panel').classList.toggle("active");
        document.querySelector('.player-1-panel').classList.toggle("active");
        //Шоог түр алга болгоно
        diceDom.style.display = 'none';
}

// New Game Буюу шинэ тоглоом эхлүүлэх товчны листенер
document.querySelector('.btn-new').addEventListener('click' , function(){
    initGame();
});
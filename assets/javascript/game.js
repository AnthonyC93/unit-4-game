//show 4 cards
//pick one
//make other 3 cards 
var characters=[
    obi={
        name:"Obi Wan Kenobi",
        health:120,
        attack:8,
        counterA:15,
        source:"assets/images/obi.jpg",
        isCharacter:false,
        isDead:false,
        id:"obi"
    },
    luke={
        name:"Luke Skywalker",
        health:100,    
        attack:6,
        counterA:10,
        source:"assets/images/luke.jpg",
        isCharacter:false,
        isDead:false,
        id:"luke"
    },
    darthSid={
        name:"Darth Siduous",
        health:150,
        attack:8,
        counterA:20,
        source:"assets/images/sid.jpg",
        isCharacter:false,
        isDead:false,
        id:"darthSid"
    },
    darthMaul={
        name:"Darth Maul",
        health:180,
        attack:9,
        counterA:25,
        source:"assets/images/maul.jpg",
        isCharacter:false,
        isDead:false,
        id:"darthMaul"
    }
];
var enemies=[];
var isDefending=false;
var playerChoice;
var defender;

$(document).ready(function(){

    //generate first row of cards. characters to choose from.
    charsToCards(characters,"charRow");
    console.log(characters)

    $(".charOptions").one("click",function(){
        var playerCard=event.currentTarget;
        console.log(this.id)
        $("#charRow").empty();
        $("#charRow").append(playerCard);
        if(this.id==="darthMaul"){
            console.log("darthMaul is true")
            darthMaul.isCharacter=true;
            enemies.push(obi,luke,darthSid);
            playerChoice=darthMaul;
        }else
        if(this.id==="luke"){
            console.log("luke is true")
            luke.isCharacter=true;
            enemies.push(obi,darthMaul,darthSid);
            playerChoice=luke;
        }else
        if(this.id==="darthSid"){
            console.log("darthSid is true")
            darthSid.isCharacter=true;
            enemies.push(obi,luke,darthMaul);
            playerChoice=darthSid;
        }else
        if(this.id==="obi"){
            console.log("obi is true")
            obi.isCharacter=true;
            enemies.push(darthMaul,luke,darthSid);
            playerChoice=obi;
        }
        
        enemyToCards(enemies);
    
        $(".enemyCard").one("click",function(){
            console.log("enemy clicked")
            var cardToFight=event.currentTarget;
            if(this.id==="darthSid"){
                defender=darthSid;
                console.log("defender has" + defender.health)
            }else
            if(this.id==="obi"){
                defender=obi;
            }else
            if(this.id==="darthMaul"){
                defender=darthMaul;
            }else
            if(this.id==="luke"){
                defender=luke;
            }

            $("#fighterRow").append(cardToFight);
        })

        $("#attackButton").on("click",function(){
            console.log("attack pressed")
            var newMessage="";
            var newHealth;
            playerChoice.health-=defender.counterA;
            newMessage=playerChoice.name+" attacked! New Health: "+playerChoice.health;
            playerChoice.attack+=playerChoice.attack;
            defender.health-=playerChoice.attack;
            $("#fighterRow").empty();
            $("#fighterRow").append(makeCard(defender));
            $("#charRow").empty();
            $("#charRow").append(makeCard(playerChoice))
            $("#statusRow").html(newMessage);

            if(playerChoice.health<=0){
                loseGame();
            }else if(defender.health<=0){
                $("#fighterRow").empty();
                $("#statusRow").html("You Won! Pick another opponent");
            }
        })
    })

})



function charsToCards(array,appendId){
    for(var i=0;i<array.length;i++){

            
            var newCard=$("<div>");
            newCard.attr("class","card text-center charOptions");
            newCard.attr("id",array[i].id)
                var newHeader=$("<div>");
                newHeader.attr("class","card-header");
                newHeader.html(array[i].name);
                newHeader.appendTo(newCard);
    
                var newCB=$("<div>");
                newCB.attr("class","card-body");
                newCB.css("background-image","url("+array[i].source+")");
                newCB.css("background-size","cover");
    
                    // var newPic=$("<img>");
                    // newPic.attr("class","img-fluid");
                    // newPic.attr("src",characters[i].source);
                    // newPic.appendTo(newCB);        
                newCB.appendTo(newCard);
    
                var newCF=$("<div>");
                newCF.attr("class","card-footer text-muted");
                newCF.html(array[i].health);
                newCF.appendTo(newCard);
      
        newCard.appendTo($("#"+appendId));
    }
}
function charToCard(){
    console.log("entered charToCard")
    console.log(characters)
    for(var z=0;z<characters.length;z++){
        if(characters[z].isCharacter===true){
            $("#charRow").append(makeCard(characters[z]));
        }
    }
}

function enemyToCards(array2){
    for(var j=0;j<array2.length;j++){
        console.log("enemy to cards entered")
        if(array2[j].isCharacter===true || array2[j].isDead===true){continue;}

        var newCol=$("<div>");
        newCol.attr("class","col-sm");
        
        
            var newCard=$("<div>");
            newCard.attr("class","card text-center enemyCard");
            newCard.attr("id",array2[j].id)
                var newHeader=$("<div>");
                newHeader.attr("class","card-header");
                newHeader.html(array2[j].name);
                newHeader.appendTo(newCard);
    
                var newCB=$("<div>");
                newCB.attr("class","card-body");
                newCB.css("background-image","url("+array2[j].source+")");
                newCB.css("background-size","cover");
    
                    // var newPic=$("<img>");
                    // newPic.attr("class","img-fluid");
                    // newPic.attr("src",characters[i].source);
                    // newPic.appendTo(newCB);        
                newCB.appendTo(newCard);
    
                var newCF=$("<div>");
                newCF.attr("class","card-footer text-muted");
                newCF.html(array2[j].health);
                newCF.appendTo(newCard);
            newCard.appendTo(newCol);
        
      
        newCol.appendTo($("#enemyRow"));
    }
}

function makeCard(character){
    console.log("entered makeCard")
        
            var newCard=$("<div>");
            newCard.attr("class","card text-center");
            newCard.attr("id",character.id)
                var newHeader=$("<div>");
                newHeader.attr("class","card-header");
                newHeader.html(character.name);
                newHeader.appendTo(newCard);
    
                var newCB=$("<div>");
                newCB.attr("class","card-body");
                newCB.css("background-image","url("+character.source+")");
                newCB.css("background-size","cover");
    
                    // var newPic=$("<img>");
                    // newPic.attr("class","img-fluid");
                    // newPic.attr("src",characters[i].source);
                    // newPic.appendTo(newCB);        
                newCB.appendTo(newCard);
    
                var newCF=$("<div>");
                newCF.attr("class","card-footer text-muted");
                newCF.html(character.health);
                newCF.appendTo(newCard);
      
        return newCard;
}
function loseGame(){
    $("body").empty();
    $("body").append("<h1>You Lost =(</h1>")
}
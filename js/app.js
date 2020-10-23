(function(){

	// Save all data related to pictures, acting like a database
	const Model = {
		listOfPictures: [
			'https://images.unsplash.com/photo-1536500152107-01ab1422f932?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
			'https://images.unsplash.com/photo-1536500152107-01ab1422f932?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
			'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
			'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
			'https://images.unsplash.com/photo-1543227183-6b2662bd5c91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1004&q=80',
			'https://images.unsplash.com/photo-1543227183-6b2662bd5c91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1004&q=80'
		],
		matched : [],
		scores: 0,
		init: function(){
			ViewModel.getMatched(this.matched);
			return this.listOfPictures;
		}
	};

	// Represent a Hub between the Model and The View
	const ViewModel = {
		init: function(){
			View.renderClicks();
			View.renderImgs();
			View.showScores();
		},
		ImgsList: function(){
			return Model.init();
		},
		matched: function(finalAnimals){
			return Model.matched.push(finalAnimals);
		},
		getMatched: function(matched){

		},
		getScores: function(){
			return Model.scores;
		},
		changeScores: function(){
			Model.scores+= 1;
		},
		resetGame: function(){
			ViewModel.init();
			window.location.reload();
		}
	};



	//Visible part of the game which is renderd on the DOM
	const View = {
		deck: document.querySelector('#deck'),
		cards: document.querySelectorAll('.playCard'),
		resetBtn: document.querySelector('.reset'),
		shuffle:  function(array) {
		    var currentIndex = array.length, temporaryValue, randomIndex;

		    while (currentIndex !== 0) {
		        randomIndex = Math.floor(Math.random() * currentIndex);
		        currentIndex -= 1;
		        temporaryValue = array[currentIndex];
		        array[currentIndex] = array[randomIndex];
		        array[randomIndex] = temporaryValue;
		    }

		    return array;
		},
		renderClicks: function(){

			let temporaryCont = [];
			this.cards.forEach((card)=> card.addEventListener('click', (e)=>{

				if(!card.classList.contains('front') && temporaryCont.length < 2){
					e.path[1].classList.add('front');
					e.path[1].classList.remove('back');
					e.path[0].classList.add('visible');

					temporaryCont.push(e.target);


					if(temporaryCont.length === 2){
						let firstCard = temporaryCont[0];
						let secondCard = temporaryCont[1];

						if(String(firstCard.src) === String(secondCard.src)){
							ViewModel.matched(firstCard);
							ViewModel.matched(secondCard);
							ViewModel.changeScores();
							temporaryCont = [];
						}else{
							setTimeout(()=>{
								temporaryCont = [];
								firstCard.parentNode.classList.remove('front');
								firstCard.parentNode.classList.add('back');
								firstCard.classList.remove('visible');
								secondCard.parentNode.classList.remove('front');
								secondCard.parentNode.classList.add('back');
								secondCard.classList.remove('visible');
							}, 1000)
						}
					}else if(temporaryCont.length > 2){
						e.path[1].classList.remove('front');
						e.path[1].classList.add('back');
						e.path[0].classList.remove('visible');
						temporaryCont = [];
					}
					this.showScores();
				};

			}, false));
			this.reset();
		},
		showScores: function(){
			let scores = document.querySelector('.scores');
			scores.innerText = ViewModel.getScores();

		},
		renderImgs: function(){
			let counter = 0;
			let srcList = ViewModel.ImgsList();
			let listCards = this.shuffle(srcList);

			View.cards.forEach((card)=>{
				const img = document.createElement('img');
				img.src = listCards[counter];
				card.appendChild(img);
				counter += 1 ;
			});
		},
		reset: function(){
			this.resetBtn.addEventListener('click', ()=>{
				ViewModel.resetGame();
			});
		}
	};


	ViewModel.init();

}());
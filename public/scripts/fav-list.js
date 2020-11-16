const fishList = document.querySelector('.fish-list')
fetch(`api/fishes`)
	.then(response => response.json())
	.then(data => {
		data.forEach(fish => {
			if(fish['image'] === null) fish['image'] = 'https://bitsofco.de/content/images/2018/12/broken-1.png'
			fishList.innerHTML += `<div class="fish">
				<a>
					<div class="fish-title">
						${fish['specie'].charAt(0).toUpperCase() + fish['specie'].slice(1)}
					</div>
					<img src="${fish['image']}"/>
				</a>
			</div>`
		})
	}).catch(err => console.log(err))
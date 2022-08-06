const CACHE_KEY = "Books_Data"

function checkWebStorage() {
	return typeof Storage !== "undefined"
}

function submitBook() {
	if (checkWebStorage()) {
		const namaBuku = document.getElementById("nama-buku").value
		const namaPenulis = document.getElementById("nama-penulis").value
		const tahunRilis = parseInt(
			document.getElementById("tahun-ditulis").value
		)
		const readCheck = document.getElementsByName("apakah-dibaca")

		if (localStorage.getItem(CACHE_KEY) === null) {
			booksData = []
		} else {
			booksData = JSON.parse(localStorage.getItem(CACHE_KEY))
		}
		const book = {
			id: +new Date(),
			title: namaBuku,
			author: namaPenulis,
			year: tahunRilis,
			isComplete: null,
		}

		for (let i = 0; i < readCheck.length; i++) {
			if (readCheck[i].checked) {
				readCheck[i].value == "true"
					? (book["isComplete"] = true)
					: (book["isComplete"] = false)
			}
		}

		const labelForm = document.getElementById("label-form")
		if (
			namaBuku === "" ||
			namaPenulis === "" ||
			tahunRilis === "" ||
			book["isComplete"] === null
		) {
			labelForm.innerHTML = "Isi form dengan benar"
		} else {
			labelForm.innerHTML = ""
			document.getElementById("form").reset()
			putBook(book)
		}

		renderBooks()
	}
}

function putBook(data) {
	if (checkWebStorage()) {
		let booksData = null
		if (localStorage.getItem(CACHE_KEY) === null) {
			booksData = []
		} else {
			booksData = JSON.parse(localStorage.getItem(CACHE_KEY))
		}

		booksData.push(data)

		localStorage.setItem(CACHE_KEY, JSON.stringify(booksData))
	}
}

function statusBook(index) {
	if (checkWebStorage()) {
		const booksData = JSON.parse(localStorage.getItem(CACHE_KEY))
		booksData[index].isComplete == true
			? (booksData[index].isComplete = false)
			: (booksData[index].isComplete = true)
		localStorage.setItem(CACHE_KEY, JSON.stringify(booksData))
		renderBooks()
	}
}

function deleteBook(index) {
	if (checkWebStorage()) {
		const booksData = JSON.parse(localStorage.getItem(CACHE_KEY))
		booksData.splice(index, 1)
		localStorage.setItem(CACHE_KEY, JSON.stringify(booksData))
		renderBooks()
	}
}

function renderBooks() {
	if (checkWebStorage()) {
		const booksData = JSON.parse(localStorage.getItem(CACHE_KEY))
		const sudahDibacaContent = document.querySelector(
			".sudah-dibaca-container"
		)
		const belumDibacaContent = document.querySelector(
			".belum-dibaca-container"
		)
		sudahDibacaContent.innerHTML = ""
		belumDibacaContent.innerHTML = ""

		for (let book in booksData) {
			card = document.createElement("div")
			card.className = "dibaca-card"
			card.innerHTML = `
		<div class="detail-container">
			<h1>Nama Buku</h1>
			<p> ${booksData[book].title} </p>
			<h1>Nama Penulis</h1>
			<p> ${booksData[book].author} </p>
			<h1>Tahun Perilisan</h1>
			<p> ${booksData[book].year} </p>
		</div>
		<div class="button-container">
			<button class="read-button" onclick="statusBook(${book})">
			${
				booksData[book].isComplete == true
					? `<span class="material-icons">
					done
				</span>`
					: `<span class="material-icons">
					close
				</span>`
			}
			</button>
			<button class="delete-button" onclick="deleteBook(${book})">
				<span class="material-icons">
					delete_outline
				</span>
			</button>
		</div>
		`
			booksData[book].isComplete == true
				? sudahDibacaContent.appendChild(card)
				: belumDibacaContent.appendChild(card)
		}
	}
}

renderBooks()

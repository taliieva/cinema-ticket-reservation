const container = document.querySelector(".container");
const count = document.querySelector("#count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll(".seat:not(.reserved)");

getFromLocalStorage();
calculateTotal();
container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    e.target.classList.toggle("selected");
  }

  calculateTotal();
});

select.addEventListener("change", function (e) {
  calculateTotal();
});

function calculateTotal() {
  const selectedSeats = container.querySelectorAll(".seat.selected");
  const selectedSeatsArr = [];
  const seatsArr = [];
  selectedSeats.forEach(function(seat){
    selectedSeatsArr.push(seat);
  })

  //refactor et(spread)
  seats.forEach(function(seat){
    seatsArr.push(seat)
  })

  let selectedIndex = selectedSeatsArr.map(function(seat){
    return seatsArr.indexOf(seat);
  })


  let selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * select.value;
  saveLocalStorage(selectedIndex);
}

function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats != null && selectedSeats.length>0){
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index)> -1){
                seat.classList.add('selected');
            }
        })
    }
    const selecteMovideIndex = localStorage.getItem('selecteMovideIndex')
    if(selecteMovideIndex != null){
        select.selectedIndex = selecteMovideIndex;
    }
}

function saveLocalStorage(index){
    localStorage.setItem('selectedSeats', JSON.stringify(index));
    localStorage.setItem('selecteMovideIndex', select.selectedIndex);
}

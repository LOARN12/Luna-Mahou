const images = [
  {
    src:"https://contentful.harrypotter.com/usf1vwtuqyxm/6A08sdScKsgwIOAG2Ow6K8/822e8778e44e7a1faeee2d3e7fc9b3c8/MinervaMcGonagall_PM_B1C7M2_HarryPotterBeingSortedInGreatHall_Moment.jpg",
    caption:"The Sorting Ceremony marks the beginning of a student’s magical journey at Hogwarts. First-years are sorted into one of the four houses."
  },
  {
    src:"https://geekdad.com/wp-content/uploads/2016/12/YuleBallDance.jpg",  
    caption:"The Yule Ball is a dazzling event held during the Triwizard Tournament."
  },
  {
    src:"https://colinsreview.com/wp-content/uploads/2024/01/Harry-Potter-and-the-Chamber-of-Secrets.png",
    caption:"Quidditch matches are one of the most exciting traditions at Hogwarts."
  },
  {
    src:"https://i.pinimg.com/736x/e1/1f/98/e11f9867ba944e80196b7c7021e7861f.jpg",
    caption:"Halloween Feast is celebrated with enchanted pumpkins floating in the Great Hall."
  },
  {
    src:"https://cdn.squaremeal.co.uk/article/10746/images/christmas-dinner-great-hall-warner-bros_25072024024346.jpg?w=913&auto=format%2Ccompress",
    caption:"The Christmas Feast at Hogwarts brings warmth and joy during the cold winter."
  },
  {
    src:"https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/08/triwizard-tournament.jpg",
    caption:"The Triwizard Tournament is one of the most legendary competitions in the wizarding world."
  }
];
function openModal(index) {
  currentIndex = index;
  document.getElementById("myModal").style.display = "block";
  showSlide();
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function changeSlide(n) {
  currentIndex += n;
  if (currentIndex >= images.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = images.length - 1;
  showSlide();
}

function showSlide() {
  document.getElementById("modalImg").src = images[currentIndex].src;
  document.getElementById("caption").innerText = images[currentIndex].caption;
}
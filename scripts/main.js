// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});

// Add your javascript here
function getMyAge(){
  var dob = new Date("09/08/1987");  
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms); 
  let myAge = Math.abs(age_dt.getUTCFullYear() - 1970);

  document.getElementById("myAge").innerHTML = myAge;
}

// Enhanced expand/collapse functionality
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth animation to all collapse triggers
  const collapseElements = document.querySelectorAll('.collapse');
  
  collapseElements.forEach(function(element) {
    element.addEventListener('show.bs.collapse', function () {
      this.style.transition = 'all 0.5s ease-in-out';
    });
    
    element.addEventListener('hide.bs.collapse', function () {
      this.style.transition = 'all 0.5s ease-in-out';
    });
  });

  // Add hover effects to timeline cards
  const timelineCards = document.querySelectorAll('.timeline-card');
  timelineCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
      this.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
    });
  });
});

window.onload = getMyAge()
 
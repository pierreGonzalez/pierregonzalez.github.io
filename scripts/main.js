// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});

// Add your javascript here
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
});

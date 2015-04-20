$(document).ready(function () {

    $(document).on('ready', function(event){
        $('#sidebar').toggleClass('hideSidebar');
    });

    $(document).on('click', '.menuToggle .fa-bars', function(event){
        $('#sidebar').toggleClass('hideSidebar');
        //$('#mainContent').toggleClass('moveLeft');
        event.stopPropagation();
    });

    $(document).on('click', '.menuClose', function(event){
        $('#sidebar').toggleClass('hideSidebar');
        //$('#mainContent').toggleClass('moveLeft');
        event.stopPropagation();
    });

    $(document).on('click', '.linkClose', function(event){
        $('#sidebar').toggleClass('hideSidebar');
        event.stopPropagation();
    });
});

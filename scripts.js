document.addEventListener('DOMContentLoaded', function() {
    const helloWorldText = "Hello world,";
    const aliceText = "Alice";
    const hereText = " here.";
    const helloWorldElement = document.getElementById('hello-world');
    const aliceHereElement = document.getElementById('alice-here');
    const andHereElement = document.getElementById('and-here');
    
    function typeText(text, element, delay, nextFunction) {
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, 50);
            } else if (nextFunction) {
                nextFunction();
            }
        }
        setTimeout(typing, delay);
    }

    function typeHelloWorld() {
        typeText(helloWorldText, helloWorldElement, 0, typeAlice);
    }

    function typeAlice() {
        typeText(aliceText, aliceHereElement, 50, typeHere);
    }

    function typeHere() {
        typeText(hereText, andHereElement, 50);
    }

    typeHelloWorld();
});
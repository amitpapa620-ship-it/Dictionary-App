        function playAudio() {
            var audioElement = document.getElementById('wordAudio');
            if (audioElement) {
                audioElement.play();
            }
        
        }


        function applyTimeBasedMode() {
                const hour = new Date().getHours();
                const body = document.body;

                // If it's before 6 AM or after 6 PM, apply night mode
                if (hour > 6 || hour < 18) {
                    body.classList.add('night-mode');
                    console.log("Night mode applied based on time.");
                } else {
                    body.classList.remove('night-mode');
                    console.log("Day mode applied based on time.");
                }
        }

    // Run when the page loads
    applyTimeBasedMode();
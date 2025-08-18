<template>
    
    <div class="contact-us">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <div class = "contact-container">
            <div class = "contact-method">
                <div class = "icon">
                    <i class ="fas fa-map-marker-alt"></i>
                </div>
                    <div class = "text">
                        <h4>Address</h4>
                        <u><h5>Everyone is welcome, you can find us here.</h5></u>
                        <p>314 Imam Haron Rd<br> Cape Town<br> 7780<br>Western Cape</p>
                    </div>
            </div>
             <div class="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.041834726101!2d18.4652093152125!3d-33.99834598061914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc42e1c3d7e6a5%3A0x9e7c5a7b0d0b0b0b!2s314%20Imam%20Haron%20Rd%2C%20Claremont%2C%20Cape%20Town%2C%207700%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                        width="100%"
                        height="250"
                        style="border:0;"
                        allowfullscreen
                        loading="lazy"
                        title="Cape Route Tours Location"></iframe>
                    </div>
            <hr>
            <div class = "contact-method">
                <div class = "icon">
                    <i class = "fas fa-phone"></i>
                </div>
                <div class ="details">
                    <h4>Call or Whatsapp Us</h4>
                    <p>Call: (+27) 71 005 3360<br> Whatsapp (+27) 71 234 5678</p>
                </div>
            </div>
            <hr>
            <div class = "contact-method">
                <div class= "icon">
                    <i class = "fas fa-envelope"></i>
                </div>
                <div class = "details">
                    <h4>Email</h4>
                    <p>caperoutetours@gmail.com</p>
                </div>
            </div>
            <hr>
             <div class = "contact-method">
                <div class= "icon">
                    <i class = "fas fa-clock"></i>
                </div>
                <div class = "details">
                    <h4>Business Open Hours</h4>
                        <table border="1" cellspacing="1" cellpadding="15"align ="center">
                        <thead>
                            <tr>
                            <th>Days</th>
                            <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Monday</td>
                            <td>08:00 - 16:30</td>
                            </tr>
                            <tr>
                            <td>Tuesday</td>
                            <td>08:00 - 16:30</td>
                            </tr>
                            <tr>
                            <td>Wednesday</td>
                            <td>08:00 - 16:30</td>
                            </tr>
                            <tr>
                            <td>Thursday</td>
                            <td>08:00 - 16:30</td>
                            </tr>
                            <tr>
                            <td>Friday</td>
                            <td>08:00 - 16:30</td>
                            </tr>
                            <tr>
                            <td>Saturday</td>
                            <td>08:00 - 16:30</td>
                            </tr>
                            <tr>
                            <td>Sunday</td>
                            <td>08:00 - 14:40<br> 
                            </td>
                            </tr>
                            
                        </tbody>
                        </table>
                </div>
            </div>
            <hr>
            <div class = "social-links">
                <h3>Follow us </h3> 
                <div class = "social-icons">
                  <a href = "#" aria-label = "Facebook" ><i class="fab fa-facebook"></i>Facebook</a><br><br>
                  <a href = "#" aria-label = "Instagram"><i class="fab fa-instagram"></i>Instagram</a><br><br>
                  <a href= "#" aria-label ="TikTok"><i class="fab fa-tiktok"> Tiktok</i></a><br><br>
                  <p><a href= "http://localhost:8080/message" aria-label ="message"><i class="fab fa-message">send us a message</i></a></p>
                 <hr>
                </div>
            </div>
        </div>
    </div>

</template>

<style>
    .contact-container{
        max-width: 800px;
        margin: 0 auto;
        align-items: center;
    }
    /* .contact-method{
        display: flex;
        align-items: flex-start;
        margin-bottom: 20px;
    } */
    /* .social-icons a{
        align-items: center;
        font-size:20px;
        color:#555;
        display:flex;
        background-color:#f0f0f0;
        width:40px;
        height:40px;
        border-radius:60%;
        text-decoration:none;
        justify-content: center;
        transition: all 0.3s ease;
    } */

    .social-icons a:hover{
        background-color:#2a9d8f;
        color:white;
        transform: translateY(-3px);
    }
    .icon{
        font-size:25px;
        margin-right:15px;
        color:#2a9d8f;
    }
    table{
        width:60%;
        border-collapse:collapse;
    }
    a{
        color:#2a9d8f;
        text-decoration:none;
    }

    a:hover{
        text-decoration: underline;
    }
        
</style>
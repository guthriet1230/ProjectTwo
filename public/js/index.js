const submitPost = $("#submit");
const imageUrl = $("#image-url").val();
let validImg = false;

const formSubmit = function(event) {
    event.preventDefault();
    console.log("button clicked");

    const imageUrl = $("#image-url").val().trim();
    console.log("url <", imageUrl, ">", imageUrl === "");
    if (imageUrl.endsWith(".jpg") || imageUrl.includes(".png") || imageUrl === "") {
        validImg = true;

        // $("#image-url").removeAttr("invalid");
        document.getElementById("image-url").setCustomValidity('')
    } else {
        document.getElementById("image-url").setCustomValidity('file should end in .jpg or .png')
        // $("#image-url").attr("invalid", true);
        validImg = false;
    };
    console.log(validImg);

    this.classList.remove('was-validated');
    if (this.checkValidity() === false || !validImg){
        console.log("invalid");
        this.classList.add('was-validated');
        return false;      
    }

    let newFavor = {
        title: $("#itemname").val().trim(),
        imageURL: $("#image-url").val().trim(),
        body: $("#msg").val()
    }

    $.ajax("/api/newFavor", {
        type: "POST",
        data: newFavor
    }).then(
        function (req, res) {
            // Reload the page to get the updated list
            // location.reload();
            location.assign("/get");
        }
    );

}


$('#postForm').submit(formSubmit());
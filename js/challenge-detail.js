window.onload = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const challenge_id = urlParams.size;

    const token = localStorage.getItem("access");

    no_image = "https://cdn.vectorstock.com/i/1000x1000/08/68/dollar-icon-sign-seamless-pattern-on-a-gray-vector-11350868.webp"

    async function handleEditPost() {
        const challenge_title = document.getElementById("challenge_title").value;
        // const challenge_content = document.getElementById("challenge_content").value;
        const challenge_content = $('#summernote').summernote('code');
        console.log(challenge_content)
        const amount = document.getElementById("amount").value;
        const period = document.getElementById("period").value;
        const main_image = document.getElementById("main_image").files[0];
        const formData = new FormData();
        // console.log(challenge_title.value)
        formData.append("challenge_title", challenge_title);
        formData.append("challenge_content", challenge_content);
        formData.append("amount", amount);
        formData.append("period", period);
        if (main_image) {
            formData.append("main_image", main_image);
        }

        if (challenge_title && challenge_content) {
            console.log(formData);
            const response = await fetch(`${BACK_BASE_URL}/api/challenge/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.status == 201) {
                alert("게시글 작성완료");
                window.location.replace(`${FRONT_BASE_URL}/challenge-post.html`);
            } else {
                const result = await response.json()
                console.log(result)
                alert("작성이 취소되었습니다");
            }
        } else {
            console.log(response.json())
            alert("빈칸을 작성하세요");
        }
    }

}
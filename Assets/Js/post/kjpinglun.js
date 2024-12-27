document.addEventListener("DOMContentLoaded", function () {
            // 创建并添加快捷回复按钮到指定位置
            const buttonHTML = '<span id="quick-reply-btn" type="button" class="but input-signin mr6" style="cursor:pointer;border: 1px dashed var(--b2color);border-radius: 5px;height: 32px;width: 94px;padding: 5px;position: absolute;right: 181px;"><i class="b2font b2-brush-line" aria-hidden="true" /></i>快捷评论</span>';
            const targetDiv = document.querySelector('.com-form-button-l');
            if (targetDiv) {
                targetDiv.insertAdjacentHTML('afterend', buttonHTML);
            }

            // 快捷回复按钮（此时已经添加到页面上了，重新获取一下）
            const quickReplyBtn = document.getElementById("quick-reply-btn");

            // 预设的快捷回复内容
            const quickReplies = [
                "不错，给你点个赞，继续加油哈！",
                "感谢大佬无偿分享！",
                "下载看看，先赞一个！",
                "UP主你很酷！",
                "好小子，我看好你！",
                "博主大好人，给你点赞！",
                "必须加油打气！"
            ];

            // 创建快捷回复弹窗
            const quickReplyModal = document.createElement("div");
            quickReplyModal.className = "quick-reply-modal";
            quickReplyModal.style.display = "none";

            let modalContent = '<div class="quick-reply-content">';
            modalContent += '<h3>选择快捷回复</h3>';
            modalContent += '<ul>';
            quickReplies.forEach((reply, index) => {
                modalContent += `<li data-reply="${reply}">${reply}</li>`;
            });
            modalContent += '</ul>';
            modalContent += '<button class="close-modal">关闭</button>';
            modalContent += '</div>';
            quickReplyModal.innerHTML = modalContent;

            // 将弹窗添加到页面
            document.body.appendChild(quickReplyModal);

            // 显示快捷回复弹窗
            quickReplyBtn.addEventListener("click", function () {
                quickReplyModal.style.display = "block";
            });

            // 关闭快捷回复弹窗
            quickReplyModal.addEventListener("click", function (event) {
                if (event.target.classList.contains("close-modal")) {
                    quickReplyModal.style.display = "none";
                }
            });

            // 点击快捷回复选项，填充到评论框
            quickReplyModal.addEventListener("click", function (event) {
                if (event.target.tagName === "LI") {
                    const reply = event.target.getAttribute("data-reply");
                    const commentField = document.getElementById("textarea"); // 评论框的 ID
                    if (commentField) {
                        commentField.value = reply; // 填充到评论框
                    }
                    quickReplyModal.style.display = "none"; // 关闭弹窗
                }
            });
        });
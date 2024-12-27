// 评论折叠功能管理器
const CommentCollapse = {
    config: {
        defaultVisibleReplies: 3,  // 子评论默认显示3条
        defaultVisibleComments: 5, // 父级评论默认显示3条
        loadMoreCount: 5, //每次默认展开5条
        childListSelectors: [
            '.comment-children-list',
            '.topic-child-list > ul'
        ],
        childCommentSelector: '.topic-lv2',
        parentListSelector: '.topic-comment-list > ul,.comment-list > ul,.topic-comment-list.b2-radius > ul',
        parentCommentSelector: '.topic-lv1',
        commentsContainerSelector: '.topic-comments,.comment-list,.topic-comment-list.b2-radius',
        footerSelector: '.topic-comment-list-footer',
        noMoreTextSelector: '.topic-comment-list-footer > span',
        paginationSelector: 'pagenav-new',
        maxRetries: 50,
        retryInterval: 200
    },
    state: {
        retryCount: 0,
        initialized: false,
        observer: null,
        observedContainers: new Set()
    },
    waitForCommentsContainer() {
        const checkContainer = () => {
            const containers = document.querySelectorAll(this.config.commentsContainerSelector);
            if (containers.length > 0) {
                containers.forEach(container => {
                    if (!this.state.observedContainers.has(container)) {
                        this.initializeObserver(container);
                        this.state.observedContainers.add(container);
                    }
                });
                return;
            }
            this.state.retryCount++;
            if (this.state.retryCount < this.config.maxRetries) {
                setTimeout(checkContainer, this.config.retryInterval);
            }
        };
        checkContainer();
    },
    initializeObserver(container) {
        if (container.getAttribute('data-observer-initialized')) return;
        const observer = new MutationObserver((mutations) => {
            let shouldProcess = false;
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    const hasNewComments = Array.from(mutation.addedNodes).some(node =>
                        node.nodeType === 1 && (
                            this.config.childListSelectors.some(selector =>
                                node.matches(selector) || node.querySelector(selector)
                            ) ||
                            node.matches(this.config.parentCommentSelector) ||
                            node.querySelector(this.config.parentCommentSelector)
                        )
                    );
                    if (hasNewComments) {
                        shouldProcess = true;
                    }
                }
            });
            if (shouldProcess) {
                this.init();
            }
        });
        observer.observe(container, {
            childList: true,
            subtree: true
        });
        container.setAttribute('data-observer-initialized', 'true');
        this.init();
    },
    init() {
        if (!this.stylesAdded) {
            this.addStyles();
            this.stylesAdded = true;
        }
        this.processComments();
        this.hideFooter();
    },
    addStyles() {
        if (document.getElementById('comment-collapse-styles')) return;
        const styles = `
   .comment-hidden {display: none!important;}
   .comment-toggle {text-align: center;padding: 8px 0;margin: 5px 0 5px 40px;}
   .comment-collapse-processed { margin-left: 40px;}
   .parent-comment-toggle {text-align: center;padding: 12px 0;margin: 10px 0;border-top: 1px dashed var(--b2color);}
   .comment-toggle-button {background: none;padding: 5px 15px;border-radius: 15px;cursor: pointer;color:#666;transition: all 0.3s;font-size: 14px;display: inline-flex;align-items: center;gap: 5px;border: 1px dashed #666;}
   .comment-toggle-button:hover {background-color: var(--b2color);color: #fff;}
   .comment-toggle-icon {transition: transform 0.3s;}
   .comment-toggle-button[data-expanded="true"].comment-toggle-icon {transform: rotate(180deg);}
   .topic-comment-list-footer {transition: opacity 0.3s;}
   .topic-comment-list-footer.hidden {opacity: 0;pointer-events: none;}
        @media screen and (max-width: 768px) {
       .comment-toggle,.comment-collapse-processed {margin-left: 20px;}
        }
        `;
        const styleSheet = document.createElement('style');
        styleSheet.id = 'comment-collapse-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    },
    hideFooter() {
        const footerEls = document.querySelectorAll(this.config.footerSelector);
        footerEls.forEach(footer => {
            if (footer) {
                footer.classList.add('hidden');
            }
        });
    },
    showFooter() {
        const footerEls = document.querySelectorAll(this.config.footerSelector);
        footerEls.forEach(footer => {
            if (footer) {
                footer.classList.remove('hidden');
            }
        });
    },
    processComments() {
        this.processParentComments();
        this.processChildComments();
    },
    processChildComments() {
        this.config.childListSelectors.forEach(selector => {
            const commentLists = document.querySelectorAll(selector);
            commentLists.forEach(list => this.setupChildCommentCollapse(list));
        });
    },
    setupChildCommentCollapse(childList) {
        if (childList.getAttribute('data-collapse-processed')) return;
        const replies = childList.querySelectorAll(this.config.childCommentSelector);
        if (replies.length <= this.config.defaultVisibleReplies) return;
        childList.classList.add('comment-collapse-processed');
        Array.from(replies)
       .slice(this.config.defaultVisibleReplies)
       .forEach(reply => reply.classList.add('comment-hidden'));
        const toggleButton = this.createToggleButton(
            replies.length - this.config.defaultVisibleReplies
        );
        childList.appendChild(toggleButton);
        const button = toggleButton.querySelector('.comment-toggle-button');
        button.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleChildComments(childList, button, replies);
        });
        childList.setAttribute('data-collapse-processed', 'true');
    },
    createToggleButton(remainingCount) {
        const toggle = document.createElement('div');
        toggle.className = 'comment-toggle';
        toggle.innerHTML = `
        <button class="comment-toggle-button" data-expanded="false">
            <span class="comment-toggle-icon">▼</span>
            <span class="comment-toggle-text">查看剩余 ${remainingCount} 条回复</span>
        </button>
        `;
        return toggle;
    },
    toggleChildComments(childList, button, replies) {
        const isExpanded = button.getAttribute('data-expanded') === 'true';
        const textSpan = button.querySelector('.comment-toggle-text');
        const remainingCount = replies.length - this.config.defaultVisibleReplies;
        if (!isExpanded) {
            button.querySelector('.comment-toggle-icon').innerHTML = '▲';
            Array.from(replies)
           .slice(this.config.defaultVisibleReplies)
           .forEach(reply => reply.classList.remove('comment-hidden'));
            textSpan.textContent = '收起回复';
            button.setAttribute('data-expanded', 'true');
        } else {
            button.querySelector('.comment-toggle-icon').innerHTML = '▼';
            Array.from(replies)
           .slice(this.config.defaultVisibleReplies)
           .forEach(reply => reply.classList.add('comment-hidden'));
            textSpan.textContent = `查看剩余 ${remainingCount} 条回复`;
            button.setAttribute('data-expanded', 'false');
        }
    },
    processParentComments() {
        const parentLists = document.querySelectorAll(this.config.parentListSelector);
        parentLists.forEach(list => {
            if (list.getAttribute('data-parent-collapse-processed')) return;
            const comments = list.querySelectorAll(this.config.parentCommentSelector);
            if (comments.length <= this.config.defaultVisibleComments) {
                setTimeout(() => {
                    this.showFooter();
                }, 100);
                return;
            }
            Array.from(comments)
           .slice(this.config.defaultVisibleComments)
           .forEach(comment => comment.classList.add('comment-hidden'));
            const toggleButton = this.createLoadMoreButton(
                comments.length,
                this.config.defaultVisibleComments
            );
            list.appendChild(toggleButton);
            const button = toggleButton.querySelector('.comment-toggle-button');
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadMoreComments(list, button, comments);
            });
            list.setAttribute('data-parent-collapse-processed', 'true');
            list.setAttribute('data-current-visible', this.config.defaultVisibleComments.toString());
        });
    },
    createLoadMoreButton(totalCount, visibleCount) {
        const toggle = document.createElement('div');
        toggle.className = 'parent-comment-toggle';
        const remainingCount = totalCount - visibleCount;
        toggle.innerHTML = `
        <button class="comment-toggle-button" data-total="${totalCount}" data-visible="${visibleCount}" data-load-count="${this.config.loadMoreCount}" data-expanded="false">
            <span class="comment-toggle-icon">▼</span>
            <span class="comment-toggle-text"> 查看更多评论 (${Math.min(remainingCount, this.config.loadMoreCount)}条)</span>
        </button>
        `;
        return toggle;
    },
    loadMoreComments(list, button, comments) {
        const currentVisible = parseInt(list.getAttribute('data-current-visible'));
        const totalComments = comments.length;
        const loadCount = parseInt(button.getAttribute('data-load-count'));
        const isExpanded = button.getAttribute('data-expanded') === 'true';
        if (!isExpanded) {
            button.querySelector('.comment-toggle-icon').innerHTML = '▲';
            const nextVisible = Math.min(currentVisible + loadCount, totalComments);
            Array.from(comments)
           .slice(currentVisible, nextVisible)
           .forEach(comment => comment.classList.remove('comment-hidden'));
            list.setAttribute('data-current-visible', nextVisible.toString());
            button.setAttribute('data-expanded', 'true');
            button.querySelector('.comment-toggle-text').textContent = '收起评论';
        } else {
            button.querySelector('.comment-toggle-icon').innerHTML = '▼';
            const startIndex = currentVisible - loadCount;
            const endIndex = currentVisible;
            Array.from(comments)
           .slice(startIndex, endIndex)
           .forEach(comment => comment.classList.add('comment-hidden'));
            list.setAttribute('data-current-visible', startIndex.toString());
            button.setAttribute('data-expanded', 'false');
            button.querySelector('.comment-toggle-text').textContent = `查看更多评论 (${Math.min(totalComments - startIndex, this.config.loadMoreCount)}条)`;
        }
        // 这里调整，无论是否全部收起，都不删除按钮，只是根据情况更新显示文本和属性
        button.querySelector('.comment-toggle-text').textContent = isExpanded? `查看更多评论 (${Math.min(totalComments - startIndex, this.config.loadMoreCount)}条)` : '收起评论';
    }
};
// 初始化
document.addEventListener('DOMContentLoaded', () => {
    CommentCollapse.waitForCommentsContainer();
});
// 备用初始化方法
window.initCommentCollapse = () => {
    CommentCollapse.waitForCommentsContainer();
};
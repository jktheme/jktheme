// 文章评论折叠功能管理器
const ArticleCommentCollapse = {
    config: {
        defaultVisibleReplies: 3,  // 每个父评论下的子评论默认显示数量
        defaultVisibleComments: 5, // 顶层父评论默认显示数量
        loadMoreCount: 5, // 每次加载更多的数量
        childListSelectors: [
            'ul.children'  // 子评论列表选择器
        ],
        childCommentSelector: '.comment', // 子评论选择器
        parentListSelector: '.comment-list', // 父评论列表选择器
        parentCommentSelector: 'article.comment', // 父评论选择器
        commentsContainerSelector: '.comments-area-content', // 评论区容器
        maxRetries: 50,
        retryInterval: 200
    },
    state: {
        retryCount: 0,
        initialized: false,
        observer: null,
        observedContainers: new Set()
    },

    // 等待评论容器加载
    waitForCommentsContainer() {
        const checkContainer = () => {
            const containers = document.querySelectorAll(this.config.commentsContainerSelector);
            const parentLists = document.querySelectorAll(this.config.parentListSelector);
            
            // 同时检查评论容器和父评论列表是否都已加载
            if (containers.length > 0 && parentLists.length > 0) {
                containers.forEach(container => {
                    if (!this.state.observedContainers.has(container)) {
                        this.initializeObserver(container);
                        this.state.observedContainers.add(container);
                        // 立即处理已存在的评论
                        this.processComments();
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

    // 初始化观察器
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

    // 初始化功能
    init() {
        if (!this.stylesAdded) {
            this.addStyles();
            this.stylesAdded = true;
        }
        this.processComments();
    },

    // 添加必要的样式
    addStyles() {
        if (document.getElementById('article-comment-collapse-styles')) return;
        const styles = `
            .comment-hidden {
                display: none !important;
            }
            .comment-toggle {
                text-align: center;
                padding: 8px 0;
                margin: 5px 0;
            }
            .parent-comment-toggle {
                text-align: center;
                padding: 12px 0;
                margin: 10px 0;
                border-top: 1px solid #eee;
            }
            .comment-toggle-button {
                background: none;
                padding: 5px 15px;
                border-radius: 15px;
                cursor: pointer;
                color: #666;
                transition: all 0.3s;
                font-size: 14px;
                display: inline-flex;
                align-items: center;
                gap: 5px;
            }
            .comment-toggle-button:hover {
                background-color: rgba(0, 0, 0, 0.05);
                color: var(--b2color);
            }
            .comment-toggle-icon {
                transition: transform 0.3s;
            }
            .comment-toggle-button[data-expanded="true"] .comment-toggle-icon {
                transform: rotate(180deg);
            }
            @media screen and (max-width: 768px) {
                .comment-toggle {
                    margin-left: 30px;
                }
            }
        `;
        const styleSheet = document.createElement('style');
        styleSheet.id = 'article-comment-collapse-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    },
    // 处理所有评论
    processComments() {
        // 先处理父评论，确保前5条父评论可见
        this.processParentComments();
        // 然后处理每个可见父评论下的子评论
        this.processChildComments();
    },
    // 处理子评论
    processChildComments() {
        // 仅处理可见父评论下的子评论列表
        const visibleParentComments = Array.from(document.querySelectorAll(this.config.parentCommentSelector))
            .filter(comment => !comment.classList.contains('comment-hidden'));
        
        visibleParentComments.forEach(parentComment => {
            this.config.childListSelectors.forEach(selector => {
                const childLists = parentComment.querySelectorAll(selector);
                childLists.forEach(list => this.setupChildCommentCollapse(list));
            });
        });
    },
    // 设置子评论折叠
    setupChildCommentCollapse(childList) {
        if (childList.getAttribute('data-collapse-processed')) return;
        
        const replies = childList.querySelectorAll(this.config.childCommentSelector);
        if (replies.length <= this.config.defaultVisibleReplies) return;

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
    // 创建折叠按钮
    createToggleButton(remainingCount) {
        const toggle = document.createElement('div');
        toggle.className = 'comment-toggle';
        toggle.innerHTML = `
            <button class="comment-toggle-button" data-expanded="false">
                <span class="comment-toggle-icon">▼</span>
                <span class="comment-toggle-text">展开${remainingCount}条回复</span>
            </button>
        `;
        return toggle;
    },
    // 切换子评论显示状态
    toggleChildComments(childList, button, replies) {
        const isExpanded = button.getAttribute('data-expanded') === 'true';
        const textSpan = button.querySelector('.comment-toggle-text');
        const remainingCount = replies.length - this.config.defaultVisibleReplies;
        
        if (!isExpanded) {
            Array.from(replies)
                .slice(this.config.defaultVisibleReplies)
                .forEach(reply => reply.classList.remove('comment-hidden'));
            textSpan.textContent = '收起回复';
            button.setAttribute('data-expanded', 'true');
        } else {
            Array.from(replies)
                .slice(this.config.defaultVisibleReplies)
                .forEach(reply => reply.classList.add('comment-hidden'));
            textSpan.textContent = `展开${remainingCount}条回复`;
            button.setAttribute('data-expanded', 'false');
        }
    },
    // 处理父级评论
    processParentComments() {
        const parentLists = document.querySelectorAll(this.config.parentListSelector);
        
        parentLists.forEach(list => {
            if (list.getAttribute('data-parent-collapse-processed')) return;
            
            // 直接获取所有一级评论
            const comments = Array.from(list.children).filter(child => 
                child.matches(this.config.parentCommentSelector) || 
                child.querySelector(this.config.parentCommentSelector)
            );
            // 检查是否需要折叠
            if (comments.length <= this.config.defaultVisibleComments) return;
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
    // 创建加载更多按钮
    createLoadMoreButton(totalCount, visibleCount) {
        const toggle = document.createElement('div');
        toggle.className = 'parent-comment-toggle';
        const remainingCount = totalCount - visibleCount;
        toggle.innerHTML = `
            <button class="comment-toggle-button" 
                    data-total="${totalCount}" 
                    data-visible="${visibleCount}" 
                    data-load-count="${this.config.loadMoreCount}">
                <span class="comment-toggle-icon">▼</span>
                <span class="comment-toggle-text">
                    加载更多评论 (${Math.min(remainingCount, this.config.loadMoreCount)}条)
                </span>
            </button>
        `;
        return toggle;
    },
    // 加载更多父评论
    loadMoreComments(list, button, comments) {
        const currentVisible = parseInt(list.getAttribute('data-current-visible'));
        const totalComments = comments.length;
        const loadCount = parseInt(button.getAttribute('data-load-count'));
        const nextVisible = Math.min(currentVisible + loadCount, totalComments);
        // 显示新的父评论
        Array.from(comments)
            .slice(currentVisible, nextVisible)
            .forEach(comment => {
                comment.classList.remove('comment-hidden');
                // 处理新显示的父评论下的子评论
                this.config.childListSelectors.forEach(selector => {
                    const childLists = comment.querySelectorAll(selector);
                    childLists.forEach(list => this.setupChildCommentCollapse(list));
                });
            });
        list.setAttribute('data-current-visible', nextVisible.toString());
        
        if (nextVisible >= totalComments) {
            button.parentElement.remove();
            document.dispatchEvent(new Event('commentsFullyLoaded'));
        } else {
            const remainingCount = totalComments - nextVisible;
            const nextLoadCount = Math.min(remainingCount, loadCount);
            button.querySelector('.comment-toggle-text').textContent = 
                `加载更多评论 (${nextLoadCount}条)`;
        }
    }
};
// 初始化
document.addEventListener('DOMContentLoaded', () => {
    ArticleCommentCollapse.waitForCommentsContainer();
});
// 备用初始化方法
window.initArticleCommentCollapse = () => {
    ArticleCommentCollapse.waitForCommentsContainer();
};
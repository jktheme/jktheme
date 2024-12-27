/*代码高亮
极客主题jktheme.com*/
window.addEventListener('load', () => {
    setTimeout(() => {
        const preElements = document.querySelectorAll('pre');
        
        preElements.forEach((pre, index) => {
            // 检查是否已经被包装
            if (!pre.parentElement.classList.contains('code-toolbar')) {
                // 创建外层容器
                const wrapper = document.createElement('div');
                wrapper.className = 'code-toolbar';

                // 创建工具栏
                const toolbar = document.createElement('div');
                toolbar.className = 'toolbar';

                // 创建工具栏项目
                const toolbarItem = document.createElement('div');
                toolbarItem.className = 'toolbar-item';

                // 创建复制按钮
                const copyButton = document.createElement('button');
                copyButton.textContent = '复制代码';
                copyButton.setAttribute('data-clipboard-target', '#copy' + index);

                // 设置 pre 的 ID
                pre.id = 'copy' + index;

                // 将 pre 元素包装在新容器中
                pre.parentNode.insertBefore(wrapper, pre);
                wrapper.appendChild(pre);

                // 添加工具栏
                toolbarItem.appendChild(copyButton);
                toolbar.appendChild(toolbarItem);
                wrapper.appendChild(toolbar);
            }
        });

        // 初始化 ClipboardJS
        const clipboardCopy = new ClipboardJS('.toolbar-item button');
        
        clipboardCopy.on('success', function(e) {
            e.clearSelection();
            const trigger = e.trigger;
            trigger.textContent = '复制成功';
            trigger.disabled = true;
            
            setTimeout(() => {
                trigger.textContent = '再次复制';
                trigger.disabled = false;
            }, 2000);
        });
    }, 600);
});
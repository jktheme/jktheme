   window.onload = function () {
            // 直接查找具有topic-avatar类的元素
            const avatars = document.querySelectorAll('.topic-avatar');
            if (avatars.length > 0) {
                // 遍历所有找到的topic-avatar元素
                avatars.forEach(avatar => {
                    const userLink = avatar.querySelector('a[target="_blank"]');
                    if (userLink && userLink.href.includes('id=')) {
                        const userId = userLink.href.split('id=')[1];
                        const statsDiv = avatar.querySelector('.user-s-data');
                        if (statsDiv) {
                            const jk_info_url = 'https://sjcnh.cn/wp-content/themes/b2child_JK/Inc/plugins/getAuthorInfo/';
                            Promise.all([
                                jQuery.get(jk_info_url + 'get_author_post_count.php?user_id=' + userId),
                                jQuery.get(jk_info_url + 'get_author_comment_count.php?user_id=' + userId),
                                jQuery.get(jk_info_url + 'get_author_following_count.php?user_id=' + userId),
                                jQuery.get(jk_info_url + 'get_author_followers_count.php?user_id=' + userId)
                            ])
                             .then(([postDataRes, commentDataRes, followingDataRes, followersDataRes]) => {
                                    let userData = {
                                        post_count: 0,
                                        comment_count: 0,
                                        following: 0,
                                        followers: 0
                                    };
                                    let hasError = false;
                                    // 处理文章数量接口返回数据
                                    if (postDataRes && postDataRes.status ==='success' && postDataRes.data) {
                                        userData.post_count = postDataRes.data.post_count || 0;
                                    } else {
                                        hasError = true;
                                        userData.post_count = '加载失败';
                                    }
                                    // 处理评论数量接口返回数据
                                    if (commentDataRes && commentDataRes.status ==='success' && commentDataRes.data) {
                                        userData.comment_count = commentDataRes.data.comment_count || 0;
                                    } else {
                                        hasError = true;
                                        userData.comment_count = '加载失败';
                                    }
                                    // 处理关注数量接口返回数据
                                    if (followingDataRes && followingDataRes.status ==='success' && followingDataRes.data) {
                                        userData.following = followingDataRes.data.following_count || 0;
                                    } else {
                                        hasError = true;
                                        userData.following = '加载失败';
                                    }
                                    // 处理粉丝数量接口返回数据
                                    if (followersDataRes && followersDataRes.status ==='success' && followersDataRes.data) {
                                        userData.followers = followersDataRes.data.followers_count || 0;
                                    } else {
                                        hasError = true;
                                        userData.followers = '加载失败';
                                    }
                                    if (hasError) {
                                        statsDiv.innerHTML = `
                                            <div><span>文章</span>
                                                <p id="post_count">${userData.post_count}</p>
                                            </div>
                                            <div><span>评论</span>
                                                <p id="comment_count">${userData.comment_count}</p>
                                            </div>
                                            <div><span>关注</span>
                                                <p id="following">${userData.following}</p>
                                            </div>
                                            <div><span>粉丝</span>
                                                <p  id="followers">${userData.followers}</p>
                                            </div>
                                            <div><span>提示</span>
                                                <p>部分数据加载失败，请稍后重试。</p>
                                            </div>
                                        `;
                                    } else {
                                        statsDiv.innerHTML = `
                                            <div><span>文章</span>
                                                <p>${userData.post_count}</p>
                                            </div>
                                            <div><span>评论</span>
                                                <p>${userData.comment_count}</p>
                                            </div>
                                            <div><span>关注</span>
                                                <p>${userData.following}</p>
                                            </div>
                                            <div><span>粉丝</span>
                                                <p>${userData.followers}</p>
                                            </div>
                                        `;
                                    }
                                });
                        }
                    }
                });
            }
        };
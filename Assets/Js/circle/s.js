document.addEventListener('DOMContentLoaded', function() {
   document.addEventListener('mouseover', function(event) {
       if(event.target.closest('.topic-avatar')) {
           const avatar = event.target.closest('.topic-avatar');
           const userLink = avatar.querySelector('a[target="_blank"]');
           if(userLink && userLink.href.includes('id=')) {
               const userId = userLink.href.split('id=')[1];
               const statsDiv = avatar.querySelector('.user-s-data');
               if(statsDiv) {
                   const b2_rest_url = 'https://www.sjcnh.cn/wp-content/themes/b2child_JK/Inc/plugins/getAuthorInfo/';
                   Promise.all([
                        jQuery.post(b2_rest_url + 'getAuthorInfo', { author_id: userId }),
                        jQuery.post(b2_rest_url + 'getUserPublicData', 'user_id=' + userId),
                        jQuery.post(b2_rest_url + 'getAuthorComments', 'user_id=' + userId),
                        jQuery.post(b2_rest_url + 'getPostList', 'post_type=post-1&author__in[0]=' + userId)
                   ]).then(([authorInfo, publicData,userComment,postData]) => {
                       const tempDiv = document.createElement('div');
                       tempDiv.innerHTML = userComment.data;
                       const comments = tempDiv.querySelectorAll('.author-comment-content-text p');
                       const totalComments = comments.length;
                       const userData = {
                           post_count: postData.count || 0,
                           comment_count: totalComments || 0,
                           following: authorInfo.following || 0,
                           followers: authorInfo.followers || 0
                       };
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
                   }).catch(err => {
                       console.log('获取数据失败:', err)
                   });
               }
           }
       }
   });
});
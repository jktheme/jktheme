/**排行榜*/
(function($) {
    $(document).ready(function() {
        var latestIndex = 0;
        var recommendedIndex = 0;
        var recommendationIndex = 0;
        
        $('#latestRankingList .rank-item[data-index="' + latestIndex + '"] .picture-show').show();
        $('#recommendedRankingList .rank-item[data-index="' + recommendedIndex + '"] .picture-show').show();
        $('#recommendationRankingList .rank-item[data-index="' + recommendationIndex + '"] .picture-show').show();
        
        $('#latestRankingList .rank-item').mouseenter(function() {
            var index = $(this).data('index');
            if (index !== latestIndex) {
                $('#latestRankingList .rank-item[data-index="' + latestIndex + '"] .picture-show').hide();
                $('#latestRankingList .rank-item[data-index="' + latestIndex + '"] .z-author').show();
                $('#latestRankingList .rank-item[data-index="' + latestIndex + '"] .flowerNumber').show();
                latestIndex = index;
            }
            $(this).find('.picture-show').show();
            $(this).find('.z-author').hide();
            $(this).find('.flowerNumber').hide();
        });
        
        $('#recommendedRankingList .rank-item').mouseenter(function() {
            var index = $(this).data('index');
            if (index !== recommendedIndex) {
                $('#recommendedRankingList .rank-item[data-index="' + recommendedIndex + '"] .picture-show').hide();
                $('#recommendedRankingList .rank-item[data-index="' + recommendedIndex + '"] .z-author').show();
                $('#recommendedRankingList .rank-item[data-index="' + recommendedIndex + '"] .flowerNumber').show();
                recommendedIndex = index;
            }
            $(this).find('.picture-show').show();
            $(this).find('.z-author').hide();
            $(this).find('.flowerNumber').hide();
        });
        
        $('#recommendationRankingList .rank-item').mouseenter(function() {
            var index = $(this).data('index');
            if (index !== recommendationIndex) {
                $('#recommendationRankingList .rank-item[data-index="' + recommendationIndex + '"] .picture-show').hide();
                $('#recommendationRankingList .rank-item[data-index="' + recommendationIndex + '"] .z-author').show();
                $('#recommendationRankingList .rank-item[data-index="' + recommendationIndex + '"] .flowerNumber').show();
                recommendationIndex = index;
            }
            $(this).find('.picture-show').show();
            $(this).find('.z-author').hide();
            $(this).find('.flowerNumber').hide();
        });
        
        $('#latestRankingList .title-tab').mouseenter(function() {
            var timeRange = $(this).data('time-range');
            $(this).addClass('active').siblings().removeClass('active');
            $('#latestRankingList #dayFlowerRank').toggle(timeRange === 'today');
            $('#latestRankingList #weekFlowerRank').toggle(timeRange === '7 days ago');
            
            latestIndex = 0;
            $('#latestRankingList .rank-item .picture-show').hide();
            $('#latestRankingList .rank-item .z-author').show();
            $('#latestRankingList .rank-item .flowerNumber').show();
            $('#latestRankingList .rank-item[data-index="' + latestIndex + '"] .picture-show').show();
            $('#latestRankingList .rank-item[data-index="' + latestIndex + '"] .z-author').hide();
            $('#latestRankingList .rank-item[data-index="' + latestIndex + '"] .flowerNumber').hide();
        });
        
        $('#recommendedRankingList .title-tab').mouseenter(function() {
            var timeRange = $(this).data('time-range');
            $(this).addClass('active').siblings().removeClass('active');
            $('#recommendedRankingList #dayactivityRank').toggle(timeRange === 'today');
            $('#recommendedRankingList #weekactivityRank').toggle(timeRange === '7 days ago');
            
            recommendedIndex = 0;
            $('#recommendedRankingList .rank-item .picture-show').hide();
            $('#recommendedRankingList .rank-item .z-author').show();
            $('#recommendedRankingList .rank-item .flowerNumber').show();
            $('#recommendedRankingList .rank-item[data-index="' + recommendedIndex + '"] .picture-show').show();
            $('#recommendedRankingList .rank-item[data-index="' + recommendedIndex + '"] .z-author').hide();
            $('#recommendedRankingList .rank-item[data-index="' + recommendedIndex + '"] .flowerNumber').hide();
        });
        
        $('#recommendationRankingList .title-tab').mouseenter(function() {
            var timeRange = $(this).data('time-range');
            $(this).addClass('active').siblings().removeClass('active');
            $('#recommendationRankingList #dayarecommendationRank').toggle(timeRange === 'today');
            $('#recommendationRankingList #weekarecommendationRank').toggle(timeRange === '7 days ago');
            
            recommendationIndex = 0;
            $('#recommendationRankingList .rank-item .picture-show').hide();
            $('#recommendationRankingList .rank-item .z-author').show();
            $('#recommendationRankingList .rank-item .flowerNumber').show();
            $('#recommendationRankingList .rank-item[data-index="' + recommendationIndex + '"] .picture-show').show();
            $('#recommendationRankingList .rank-item[data-index="' + recommendationIndex + '"] .z-author').hide();
            $('#recommendationRankingList .rank-item[data-index="' + recommendationIndex + '"] .flowerNumber').hide();
        });
    });
})(jQuery);
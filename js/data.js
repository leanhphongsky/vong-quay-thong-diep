// ============================================================
// DATA: 66 Thông Điệp — Phân Loại Năng Lượng & Hành Động Ngày
// ============================================================

const CATEGORIES = {
  WISDOM:     { id: 'wisdom',     name: 'Trí Tuệ & Tĩnh Lặng',  iconName: 'wisdomLotus', color: '#9B89B3' },
  LOVE:       { id: 'love',       name: 'Yêu Thương & Chữa Lành', iconName: 'loveRadiant', color: '#E07A5F' },
  DISCIPLINE: { id: 'discipline', name: 'Kỷ Luật & Hành Động',  iconName: 'disciplineFlame', color: '#E9C46A' },
  FLOW:       { id: 'flow',       name: 'Thuận Dòng & Tái Sinh', iconName: 'flowWave', color: '#81B29A' }
};

const MESSAGES = [
  {
    "id": 1,
    "name": "Kỷ Luật",
    "category": "discipline",
    "desc": "Kỷ luật là cầu nối giữa ước mơ và hiện thực. Mỗi hành động nhất quán hôm nay tạo nên con người bạn của ngày mai.",
    "action": "Hoàn thành trọn vẹn một việc quan trọng nhất ngay trước 11h trưa mà không trì hoãn."
  },
  {
    "id": 2,
    "name": "Kiên Nhẫn",
    "category": "wisdom",
    "desc": "Hạt giống tốt nhất cần thời gian để nảy mầm. Hãy tin tưởng vào nhịp điệu của cuộc sống.",
    "action": "Mỗi khi cảm thấy nôn nóng hôm nay, hãy thở sâu 3 nhịp và mỉm cười nhẹ nhàng."
  },
  {
    "id": 3,
    "name": "Tập Trung",
    "category": "discipline",
    "desc": "Khi bạn tập trung vào một điều, cả vũ trụ sẽ cùng bạn tạo ra nó. Hôm nay, chọn một điều quan trọng nhất.",
    "action": "Bật chế độ không làm phiền trong 45 phút để làm việc trong trạng thái dòng chảy."
  },
  {
    "id": 4,
    "name": "Tình Yêu Tỉnh Thức",
    "category": "love",
    "desc": "Yêu với sự tỉnh thức là biết trân trọng từng khoảnh khắc bên nhau, không phán xét — chỉ hiểu và đón nhận.",
    "action": "Gửi một lời khen ngợi hoặc lời cảm ơn chân thành đến người bạn trân quý."
  },
  {
    "id": 5,
    "name": "Sống Thật",
    "category": "wisdom",
    "desc": "Phiên bản thật của bạn luôn đẹp hơn bất kỳ vai diễn nào. Dũng cảm sống đúng với chính mình.",
    "action": "Dám nói lời từ chối với những điều không phù hợp với giá trị sống của bạn."
  },
  {
    "id": 6,
    "name": "Yêu Chính Mình",
    "category": "love",
    "desc": "Tình yêu với bản thân không phải là ích kỷ — đó là nền tảng để bạn yêu thương người khác trọn vẹn hơn.",
    "action": "Tự thưởng cho bản thân một món quà nhỏ hoặc món ăn bạn yêu thích mà không cảm thấy áy náy."
  },
  {
    "id": 7,
    "name": "Chấp Nhận Thử Thách",
    "category": "discipline",
    "desc": "Mỗi thử thách là một người thầy ẩn danh. Hỏi nó: 'Em muốn dạy mình điều gì?'",
    "action": "Nhìn một vấn đề đang gây phiền lòng dưới góc nhìn: 'Cơ hội phát triển ở đâu trong việc này?'"
  },
  {
    "id": 8,
    "name": "Hiện Thực Hóa Năng Lực",
    "category": "discipline",
    "desc": "Tiềm năng của bạn không phải là tương lai xa xôi — nó đang chờ được thắp sáng ngay hôm nay.",
    "action": "Bắt tay vào thực hiện bước đầu tiên của dự án bạn từng ấp ủ từ lâu."
  },
  {
    "id": 9,
    "name": "Vượt Qua Giới Hạn Cũ",
    "category": "discipline",
    "desc": "Giới hạn của ngày hôm qua là điểm khởi đầu của ngày hôm nay. Bước tiếp đi!",
    "action": "Làm một việc bạn từng ngại hoặc chưa từng thử làm trước đây."
  },
  {
    "id": 10,
    "name": "Tái Sinh",
    "category": "flow",
    "desc": "Mỗi buổi sáng thức dậy là một cơ hội để tái sinh. Phiên bản mới của bạn bắt đầu từ hơi thở này.",
    "action": "Gạt bỏ một nuối tiếc cũ và bắt đầu ngày mới như một trang giấy trắng tinh khôi."
  },
  {
    "id": 11,
    "name": "Bảo Vệ Năng Lượng",
    "category": "wisdom",
    "desc": "Năng lượng của bạn là tài nguyên quý giá nhất. Hôm nay, hãy có ý thức về nơi bạn đặt nó.",
    "action": "Hạn chế lướt mạng xã hội vô thức và tránh xa các cuộc tranh luận tiêu cực."
  },
  {
    "id": 12,
    "name": "Tối Giản Đời Sống",
    "category": "flow",
    "desc": "Khi bạn bớt đi những gì không cần thiết, không gian cho điều quan trọng sẽ tự nhiên rộng mở.",
    "action": "Dọn dẹp một góc bàn làm việc hoặc xóa bớt 5 ứng dụng/tài liệu không còn dùng."
  },
  {
    "id": 13,
    "name": "Chọn Lọc Mối Quan Hệ",
    "category": "wisdom",
    "desc": "Người bạn chọn ở cạnh sẽ định hình con người bạn trở thành. Hãy chọn những người nâng đỡ linh hồn bạn.",
    "action": "Chủ động kết nối và trò chuyện với người mang lại năng lượng tích cực cho bạn."
  },
  {
    "id": 14,
    "name": "Trân Quý Mọi Quan Hệ",
    "category": "love",
    "desc": "Mỗi mối quan hệ trong cuộc đời đều mang theo một bài học. Hãy trân quý tất cả, dù ngắn hay dài.",
    "action": "Nhắn tin hỏi thăm một người bạn cũ đã lâu chưa liên lạc."
  },
  {
    "id": 15,
    "name": "Phác Thảo Rõ Nét",
    "category": "discipline",
    "desc": "Rõ ràng là sức mạnh. Khi bạn biết mình đang làm gì và tại sao, mọi hành động đều có trọng lượng.",
    "action": "Viết ra sổ 3 mục tiêu rõ ràng nhất cho tuần này."
  },
  {
    "id": 16,
    "name": "Cống Hiến Bền Bỉ",
    "category": "discipline",
    "desc": "Giá trị bạn tạo ra qua thời gian, không phải qua một khoảnh khắc. Hãy cống hiến đều đặn, bền bỉ.",
    "action": "Làm một việc tốt nhỏ cho ai đó mà không cần họ phải biết hay cảm ơn."
  },
  {
    "id": 17,
    "name": "Tin Tưởng",
    "category": "wisdom",
    "desc": "Tin tưởng là hành động dũng cảm nhất. Tin vào bản thân, tin vào người khác, tin vào hành trình.",
    "action": "Hãy tự nói với mình trước gương: 'Tôi hoàn toàn tin tưởng vào con đường mình đang đi'."
  },
  {
    "id": 18,
    "name": "Tính Nữ / Tinh Tế",
    "category": "flow",
    "desc": "Sự tinh tế trong cách bạn sống, nói và hành động tạo nên vẻ đẹp không cần phô trương.",
    "action": "Ăn một bữa cơm thật chậm rãi, cảm nhận từng hương vị một cách trọn vẹn."
  },
  {
    "id": 19,
    "name": "Thực Sự Bắt Đầu",
    "category": "discipline",
    "desc": "Bắt đầu không hoàn hảo vẫn tốt hơn chờ đợi hoàn hảo mãi mãi. Hôm nay là ngày để bắt đầu.",
    "action": "Đặt bút viết dòng đầu tiên hoặc gọi cuộc gọi bạn đang chần chừ."
  },
  {
    "id": 20,
    "name": "Kiếm Sống Hay Tạo Lập Cuộc Sống",
    "category": "wisdom",
    "desc": "Bạn đang xây dựng một cuộc đời hay chỉ kiếm sống qua ngày? Câu hỏi này sẽ thay đổi mọi lựa chọn.",
    "action": "Viết ra 1 điều khiến bạn thực sự cảm thấy cuộc sống của mình có ý nghĩa và đáng sống."
  },
  {
    "id": 21,
    "name": "Từ Khóa Then Chốt",
    "category": "wisdom",
    "desc": "Những từ bạn hay dùng để mô tả cuộc sống sẽ định hình trải nghiệm. Hãy chọn từ của người chiến thắng.",
    "action": "Thay thế từ 'khó khăn' bằng 'thử thách thú vị' trong các cuộc trò chuyện hôm nay."
  },
  {
    "id": 22,
    "name": "Sống Chung Khác Biệt",
    "category": "love",
    "desc": "Sự khác biệt không phải là rào cản mà là tấm gương đa chiều để ta hiểu bản thân hơn.",
    "action": "Lắng nghe một quan điểm trái chiều mà không vội vàng phán xét hay tranh cãi."
  },
  {
    "id": 23,
    "name": "Nâng Cấp Bản Thân",
    "category": "discipline",
    "desc": "Nâng cấp không chỉ là học kỹ năng mới, mà còn là thay đổi cách tư duy trong thế giới đang thay đổi.",
    "action": "Đọc 10 trang sách phát triển bản thân hoặc nghe 1 tập podcast truyền cảm hứng."
  },
  {
    "id": 24,
    "name": "Trưởng Thành Cùng Nhau",
    "category": "love",
    "desc": "Những mối quan hệ tốt nhất là nơi cả hai cùng lớn lên, không ai bị bỏ lại phía sau.",
    "action": "Chia sẻ một điều bổ ích bạn vừa học được cho người bạn đồng hành của mình."
  },
  {
    "id": 25,
    "name": "Chánh Niệm Trong Đời Sống",
    "category": "wisdom",
    "desc": "Khi bạn hiện diện trọn vẹn trong từng khoảnh khắc, cuộc sống sẽ tự nhiên trở nên sâu sắc và ý nghĩa hơn.",
    "action": "Uống một ly nước ấm với 100% sự chú ý, cảm nhận dòng nước chảy vào cơ thể."
  },
  {
    "id": 26,
    "name": "Yêu Lành",
    "category": "love",
    "desc": "Tình yêu lành mạnh không giam cầm, không kiểm soát — nó nuôi dưỡng và trao cho nhau tự do phát triển.",
    "action": "Trao cho người thân một không gian riêng tư và sự tôn trọng tuyệt đối."
  },
  {
    "id": 27,
    "name": "Chủ Động Học Hỏi",
    "category": "discipline",
    "desc": "Người học chủ động sẽ luôn đi trước một bước. Hỏi 'tại sao' trước khi hỏi 'làm thế nào'.",
    "action": "Đặt câu hỏi tò mò về một chủ đề bạn chưa từng hiểu sâu."
  },
  {
    "id": 28,
    "name": "Đại Dương Cơ Hội",
    "category": "flow",
    "desc": "Cơ hội không thiếu, chỉ thiếu con mắt nhìn ra và dũng khí để nắm lấy.",
    "action": "Ghi nhận 3 cơ hội tiềm năng đang có mặt xung quanh bạn ngay lúc này."
  },
  {
    "id": 29,
    "name": "Buông Để Được Nhiều Hơn",
    "category": "flow",
    "desc": "Tay nắm chặt không thể nhận được điều mới. Buông bỏ là hành động can đảm để mở ra không gian mới.",
    "action": "Chủ động tha thứ cho một sơ suất nhỏ của ai đó hôm nay."
  },
  {
    "id": 30,
    "name": "Lời Đáp Êm Dịu",
    "category": "love",
    "desc": "Một lời nhẹ nhàng có thể xoa dịu cơn giận, giải quyết mâu thuẫn và chữa lành vết thương.",
    "action": "Dùng giọng điệu từ tốn, ấm áp trong mọi cuộc đối thoại ngày hôm nay."
  },
  {
    "id": 31,
    "name": "Liều Thuốc Cho Lo Âu",
    "category": "flow",
    "desc": "Lo âu cần sự hiện diện, không phải sự trốn chạy. Hãy ngồi với nó, hít thở, và nhẹ nhàng bước qua.",
    "action": "Khi thấy lo lắng, viết ra giấy điều tệ nhất có thể xảy ra và cách bạn đối diện với nó."
  },
  {
    "id": 32,
    "name": "Suy Ngẫm Về Tự Ơn",
    "category": "love",
    "desc": "Biết ơn không phải về những gì bạn có, mà về cách bạn nhìn những gì đang có.",
    "action": "Ghi lại 5 điều bạn cảm thấy biết ơn sâu sắc nhất trong ngày hôm nay."
  },
  {
    "id": 33,
    "name": "Vui Vẻ Đón Nhận",
    "category": "flow",
    "desc": "Cuộc sống luôn gửi đến những món quà — đôi khi trá hình thành thử thách. Hãy vui vẻ đón nhận tất cả.",
    "action": "Đón nhận mọi sự cố phát sinh với thái độ: 'Thật thú vị, xem mình xoay xở thế nào!'"
  },
  {
    "id": 34,
    "name": "Người Được Chọn",
    "category": "wisdom",
    "desc": "Bạn được sinh ra với một mục đích độc đáo. Hôm nay, hãy sống xứng đáng với sự lựa chọn đó.",
    "action": "Hành động bằng tất cả sự tự hào và phẩm giá tốt đẹp vốn có của bạn."
  },
  {
    "id": 35,
    "name": "Thuận Theo Dòng Chảy",
    "category": "flow",
    "desc": "Đôi khi sự khôn ngoan là biết khi nào nên buông và thuận theo dòng chảy của cuộc đời.",
    "action": "Ngừng chống cự những điều nằm ngoài tầm kiểm soát của bạn."
  },
  {
    "id": 36,
    "name": "Thay Đổi Thói Quen",
    "category": "discipline",
    "desc": "Mỗi thói quen tốt là một viên gạch xây nên ngôi nhà của cuộc sống bạn mơ ước.",
    "action": "Thay thế 15 phút lướt điện thoại buổi tối bằng việc đọc sách hoặc thiền."
  },
  {
    "id": 37,
    "name": "Giữ Mình Đứng",
    "category": "discipline",
    "desc": "Dù bão tố thế nào, hãy giữ vững bản sắc và giá trị cốt lõi của mình.",
    "action": "Nhắc nhở bản thân về nguyên tắc sống quan trọng nhất mà bạn không bao giờ đánh đổi."
  },
  {
    "id": 38,
    "name": "Lăng Kính Của Ta",
    "category": "wisdom",
    "desc": "Thực tế bạn trải nghiệm phụ thuộc vào lăng kính bạn nhìn. Hãy chọn một lăng kính tử tế hơn.",
    "action": "Tìm ra một điểm đáng khen ở một người mà bạn vốn không mấy thiện cảm."
  },
  {
    "id": 39,
    "name": "Người Có Tầm Ảnh Hưởng",
    "category": "love",
    "desc": "Tầm ảnh hưởng thực sự không đến từ quyền lực, mà từ cách bạn chạm vào cuộc sống người khác.",
    "action": "Truyền cảm hứng và động viên một người đang cảm thấy chán nản."
  },
  {
    "id": 40,
    "name": "Học Để Chuyển Hóa",
    "category": "wisdom",
    "desc": "Mỗi bài học thực sự đều thay đổi bạn từ bên trong. Học không chỉ để biết, mà để trở nên.",
    "action": "Áp dụng ngay một bài học hữu ích bạn vừa học được vào công việc thực tế."
  },
  {
    "id": 41,
    "name": "Tập Trung Sâu & Nghỉ Ngơi",
    "category": "discipline",
    "desc": "Hiệu suất cao đến từ sự cân bằng giữa tập trung sâu và nghỉ ngơi đích thực.",
    "action": "Dành 20 phút đi dạo ngoài trời hoặc nghỉ trưa để tái tạo năng lượng hoàn toàn."
  },
  {
    "id": 42,
    "name": "Hiếu Kính",
    "category": "love",
    "desc": "Lòng hiếu kính là nền tảng của nhân cách. Trân trọng những người đã nuôi dưỡng và dìu dắt bạn.",
    "action": "Gọi điện thoại thăm hỏi cha mẹ hoặc người thân trong gia đình."
  },
  {
    "id": 43,
    "name": "Cộng Sự Tốt",
    "category": "love",
    "desc": "Người cộng sự tốt nhân đôi sức mạnh của bạn. Hãy là người cộng sự mà bạn muốn có.",
    "action": "Hỗ trợ đồng nghiệp hoặc bạn bè một tay trong phần việc của họ."
  },
  {
    "id": 44,
    "name": "Hiện Diện Có Giá Trị",
    "category": "wisdom",
    "desc": "Sự hiện diện đầy đủ của bạn — không điện thoại, không phân tâm — là món quà quý nhất bạn trao cho người khác.",
    "action": "Cất điện thoại vào túi khi đang trò chuyện trực tiếp cùng người thân yêu."
  },
  {
    "id": 45,
    "name": "Lời Nguyện Cầu Giá Trị",
    "category": "wisdom",
    "desc": "Lời cầu nguyện chân thành nhất không xin cho mình, mà là lòng biết ơn và ý chí để tạo ra điều tốt đẹp.",
    "action": "Gửi một lời chúc bình an thầm lặng đến tất cả những người bạn gặp hôm nay."
  },
  {
    "id": 46,
    "name": "Yêu Mình Để Yêu Người",
    "category": "love",
    "desc": "Chỉ khi bạn thực sự yêu và chấp nhận bản thân, bạn mới có khả năng yêu người khác một cách trọn vẹn.",
    "action": "Nói lời tha thứ cho những lỗi lầm cũ của chính bản thân mình."
  },
  {
    "id": 47,
    "name": "Khiêm Nhường Khi Ở Ngôi Cao",
    "category": "wisdom",
    "desc": "Thành công thực sự đến với sự khiêm nhường. Người giỏi nhất biết rằng luôn còn rất nhiều điều để học.",
    "action": "Học hỏi một kinh nghiệm từ một người trẻ tuổi hoặc cấp dưới của mình."
  },
  {
    "id": 48,
    "name": "Định Hướng",
    "category": "discipline",
    "desc": "Có định hướng rõ ràng sẽ biến mọi hành động nhỏ thành bước tiến có ý nghĩa.",
    "action": "Xem lại bản đồ mục tiêu dài hạn và kiểm tra xem hôm nay bạn đã bước gần hơn chưa."
  },
  {
    "id": 49,
    "name": "Giải Phóng Khỏi Quá Khứ",
    "category": "flow",
    "desc": "Quá khứ là nơi để học, không phải nơi để sống. Hôm nay, hãy trao cho mình sự tha thứ và tự do.",
    "action": "Xé bỏ một mẩu giấy ghi lại điều đau buồn cũ như một nghi thức buông bỏ."
  },
  {
    "id": 50,
    "name": "Hy Vọng",
    "category": "flow",
    "desc": "Hy vọng không phải là sự ngây thơ — đó là sức mạnh giúp bạn tiếp tục khi mọi thứ khó khăn nhất.",
    "action": "Viết ra 3 điều tươi sáng mà bạn đang mong chờ trong tương lai gần."
  },
  {
    "id": 51,
    "name": "Khu Vực Giới Hạn Của Ta",
    "category": "wisdom",
    "desc": "Nhận ra giới hạn không phải là bại trận — đó là sự khôn ngoan để tập trung sức lực đúng chỗ.",
    "action": "Ủy thác hoặc buông bớt một phần việc vượt quá năng lực hiện tại của mình."
  },
  {
    "id": 52,
    "name": "Tin Để Thấy",
    "category": "wisdom",
    "desc": "Đôi khi bạn cần tin trước rồi mới thấy, không phải thấy rồi mới tin.",
    "action": "Hình dung rõ ràng trong tâm trí khoảnh khắc bạn hoàn thành ước mơ lớn."
  },
  {
    "id": 53,
    "name": "Thỏa Lòng",
    "category": "flow",
    "desc": "Sự thỏa lòng không có nghĩa là ngừng lớn — đó là biết trân trọng hành trình trong khi hướng tới đích.",
    "action": "Dừng lại 1 phút, nhìn xung quanh và tự nhủ: 'Mọi thứ ngay lúc này đã rất ổn rồi'."
  },
  {
    "id": 54,
    "name": "Khai Sáng",
    "category": "wisdom",
    "desc": "Khai sáng không phải là đích đến, mà là ánh sáng bạn mang theo trong mỗi bước đi.",
    "action": "Chia sẻ một góc nhìn tích cực với người đang bị bế tắc."
  },
  {
    "id": 55,
    "name": "Người Giúp Đỡ",
    "category": "love",
    "desc": "Khi bạn giúp đỡ người khác, bạn không chỉ thay đổi cuộc đời họ — bạn còn thay đổi chính mình.",
    "action": "Ủng hộ một người bán hàng rong hoặc giúp một người mang vác đồ nặng."
  },
  {
    "id": 56,
    "name": "Yêu Thương - Sức Mạnh Chuyển Hóa",
    "category": "love",
    "desc": "Tình yêu thương không làm bạn yếu đuối — đó là sức mạnh mạnh mẽ nhất có khả năng thay đổi mọi thứ.",
    "action": "Giải quyết một bất đồng bằng sự chân thành thay vì lý lẽ tranh cãi."
  },
  {
    "id": 57,
    "name": "Khám Phá",
    "category": "flow",
    "desc": "Mỗi ngày là một cuộc phiêu lưu. Hãy khám phá với ánh mắt của trẻ thơ và trí tuệ của người trưởng thành.",
    "action": "Đi một con đường mới về nhà hoặc thử một món uống mới lạ."
  },
  {
    "id": 58,
    "name": "Khích Lệ Bản Thân",
    "category": "love",
    "desc": "Hãy là người cổ vũ tốt nhất cho chính mình. Những lời bạn nói với bản thân quan trọng hơn bạn nghĩ.",
    "action": "Tự vỗ vai mình và nói: 'Bạn đã làm rất tốt ngày hôm nay!'."
  },
  {
    "id": 59,
    "name": "Bên Nhau Vì Phẩm Chất",
    "category": "love",
    "desc": "Những mối quan hệ bền vững nhất được xây dựng trên nền tảng của phẩm chất và giá trị chung.",
    "action": "Nói lời trân trọng một phẩm chất tốt đẹp của người bạn thân thiết."
  },
  {
    "id": 60,
    "name": "Uy Tín",
    "category": "discipline",
    "desc": "Uy tín được xây dựng từng ngày bằng sự nhất quán giữa lời nói và hành động.",
    "action": "Giữ đúng một lời hứa, dù là chi tiết nhỏ nhất đã hẹn với người khác."
  },
  {
    "id": 61,
    "name": "Yên Lòng",
    "category": "flow",
    "desc": "Sự bình yên thực sự không đến từ hoàn cảnh bên ngoài, mà từ sự chấp nhận và tin tưởng bên trong.",
    "action": "Hít một hơi thật sâu, thở ra từ từ và thả lỏng hoàn toàn đôi bờ vai."
  },
  {
    "id": 62,
    "name": "Sống Dịu Dàng Với Cuộc Đời",
    "category": "love",
    "desc": "Hãy dịu dàng với bản thân và với cuộc sống. Không có gì cần phải hoàn hảo ngay từ đầu.",
    "action": "Không tự trách bản thân nếu có việc gì đó chưa diễn ra như ý."
  },
  {
    "id": 63,
    "name": "Gửi Ý Niệm Trong Lành",
    "category": "wisdom",
    "desc": "Hôm nay, hãy để niềm vui nhỏ bé dẫn đường. Trong lành bắt đầu từ những khoảnh khắc bình dị nhất.",
    "action": "Tưới một chậu cây hoặc ngắm nhìn bầu trời buổi sáng trong 2 phút tĩnh lặng."
  },
  {
    "id": 64,
    "name": "Tôn Trọng Hành Trình Riêng",
    "category": "flow",
    "desc": "Mỗi người có hành trình riêng của mình. Đừng so sánh chương của bạn với chương của người khác.",
    "action": "Ngừng so sánh thành công của mình với người khác trên mạng xã hội."
  },
  {
    "id": 65,
    "name": "Sự Dồi Dào",
    "category": "flow",
    "desc": "Vũ trụ dồi dào hơn bạn tưởng. Hãy mở lòng để đón nhận sự phong phú đang chờ bạn.",
    "action": "Tặng đi một món đồ bạn không dùng nữa cho người thực sự cần nó."
  },
  {
    "id": 66,
    "name": "Giữ Trong Lòng Một Vùng Nước Lặng",
    "category": "wisdom",
    "desc": "Dù bên ngoài sóng gió thế nào, hãy giữ trong lòng một vùng yên tĩnh — đó là nơi bạn tìm lại chính mình.",
    "action": "Dành 5 phút trước khi ngủ ngồi trong tĩnh lặng, không thiết bị điện tử."
  }
];

// Helpers
function getMessageById(id) {
  return MESSAGES.find(m => m.id === Number(id)) || null;
}

function getMessagesByCategory(catId) {
  if (!catId || catId === 'all') return MESSAGES;
  return MESSAGES.filter(m => m.category === catId);
}

function getRandomMessage() {
  const idx = Math.floor(Math.random() * MESSAGES.length);
  return MESSAGES[idx];
}

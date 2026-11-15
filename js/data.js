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



// ============================================================
// HỆ THỐNG 7 CHỦ ĐỀ VÒNG QUAY THÔNG ĐIỆP SỐNG — TS. SUNNY ĐẶNG PHƯƠNG
// ============================================================

const TOPIC_SEED_MESSAGES = {
  'su-nghiep': [
    {
      id: 101,
      name: "Mục Tiêu Rõ Ràng",
      category: "discipline",
      desc: "Khi đích đến đã rõ ràng, mọi bước chân đều mang sức mạnh của sự quyết đoán và kiên định.",
      action: "Viết ra 3 mục tiêu ưu tiên nhất trong tuần này và gạch bỏ những việc gây xao nhãng."
    },
    {
      id: 102,
      name: "Bứt Phá Giới Hạn",
      category: "discipline",
      desc: "Vùng an toàn là nơi ấm áp, nhưng không có hạt mầm thành công nào lớn lên ở đó.",
      action: "Dám làm một việc bạn từng ngại ngần trước 3 giờ chiều hôm nay."
    },
    {
      id: 103,
      name: "Kỷ Luật Thép",
      category: "discipline",
      desc: "Động lực giúp bạn bắt đầu, nhưng chỉ có kỷ luật mới đưa bạn về đích viên mãn.",
      action: "Giữ đúng cam kết thời gian cho cuộc hẹn hoặc công việc đầu ngày."
    },
    {
      id: 104,
      name: "Quản Trị Cảm Xúc",
      category: "wisdom",
      desc: "Sự chuyên nghiệp cao nhất là giữ được tâm thế bình tĩnh trước những áp lực bất ngờ.",
      action: "Hít sâu 3 nhịp trước khi trả lời một email hoặc cuộc gọi căng thẳng."
    },
    {
      id: 105,
      name: "Tư Duy Giải Pháp",
      category: "wisdom",
      desc: "Đừng nói về lý do tại sao không thể, hãy tập trung vào cách thức để hoàn thành.",
      action: "Tìm ít nhất 2 phương án khả thi cho một khúc mắc công việc hiện tại."
    },
    {
      id: 106,
      name: "Bản Lĩnh Dẫn Đầu",
      category: "discipline",
      desc: "Lãnh đạo bằng sự chân thành và gương mẫu luôn bền vững hơn bất kỳ mệnh lệnh nào.",
      action: "Chủ động giúp đỡ và ghi nhận đóng góp tích cực của một người đồng nghiệp."
    },
    {
      id: 107,
      name: "Học Tập Trọn Đời",
      category: "wisdom",
      desc: "Trí tuệ của hôm qua không thể giải quyết được những cơ hội vĩ đại của ngày mai.",
      action: "Dành 20 phút đọc một bài học hoặc tài liệu chuyên môn nâng tầm tư duy."
    },
    {
      id: 108,
      name: "Kiên Trì Bền Bỉ",
      category: "discipline",
      desc: "Nhiều người bỏ cuộc ngay trước bước ngoặt thành công chỉ vì thiếu một chút bền bỉ.",
      action: "Tiếp tục hoàn thành công việc dở dang dù cảm thấy mệt mỏi hay chán nản."
    },
    {
      id: 109,
      name: "Tập Trung Tuyệt Đối",
      category: "discipline",
      desc: "Ngọn nến chỉ thắp sáng khi không bị gió cuốn đi mọi hướng. Hãy tập trung một việc.",
      action: "Tập trung 100% vào nhiệm vụ quan trọng trong 30 phút, tắt mọi thông báo."
    },
    {
      id: 110,
      name: "Dám Chịu Trách Nhiệm",
      category: "wisdom",
      desc: "Sức mạnh thực sự bắt đầu khi bạn nhận lãnh trách nhiệm 100% về kết quả của mình.",
      action: "Chủ động nhận trách nhiệm và đề xuất giải pháp khắc phục nếu có sai sót."
    },
    {
      id: 111,
      name: "Chiến Lược Dài Hạn",
      category: "wisdom",
      desc: "Tầm nhìn xa giúp bạn không bị lạc lối trước những biến động và thách thức ngắn hạn.",
      action: "Dành 15 phút tĩnh lặng để nhìn lại lộ trình sự nghiệp 1 năm tới của bạn."
    },
    {
      id: 112,
      name: "Vinh Quang & Khiêm Nhường",
      category: "flow",
      desc: "Đỉnh cao thực sự là khi bạn đứng trên đỉnh núi và cúi mình biết ơn cuộc đời.",
      action: "Gửi lời cảm ơn chân thành đến người đã nâng đỡ hoặc đồng hành cùng bạn."
    }
  ],
  'hon-nhan': [
    {
      id: 201,
      name: "Thấu Hiểu Trước, Phán Xét Sau",
      category: "love",
      desc: "Trong hôn nhân, người thắng trong tranh cãi thường là người thua trong hạnh phúc.",
      action: "Lắng nghe trọn vẹn người bạn đời mà không ngắt lời hay phán xét."
    },
    {
      id: 202,
      name: "Ngọn Lửa Tổ Ấm",
      category: "love",
      desc: "Gia đình không phải là nơi để đòi hỏi hoàn hảo, mà là bến đỗ để cùng nhau hoàn thiện.",
      action: "Nói một lời dịu dàng hoặc dành một cái ôm ấm áp khi trở về nhà."
    },
    {
      id: 203,
      name: "Bao Dung Khác Biệt",
      category: "love",
      desc: "Hai con người đến từ hai thế giới khác nhau cần sự bao dung làm nhịp cầu nối.",
      action: "Mỉm cười chấp nhận một thói quen nhỏ chưa ưng ý của người thân hôm nay."
    },
    {
      id: 204,
      name: "Lắng Nghe Bằng Trái Tim",
      category: "wisdom",
      desc: "Đôi khi người bạn đời không cần lời khuyên, họ chỉ cần cảm thấy mình được lắng nghe.",
      action: "Dành 15 phút trò chuyện không nhìn vào màn hình điện thoại tối nay."
    },
    {
      id: 205,
      name: "Nuôi Dưỡng Sự Gắn Kết",
      category: "love",
      desc: "Tình yêu hôn nhân như cái cây, cần tưới tắm bằng những cử chỉ quan tâm nhỏ mỗi ngày.",
      action: "Bất ngờ chuẩn bị một món ăn nhẹ hoặc gửi tin nhắn chúc ngày an lành."
    },
    {
      id: 206,
      name: "Tôn Trọng Khoảng Trời Riêng",
      category: "wisdom",
      desc: "Yêu thương sâu sắc là tôn trọng cả khoảng trời riêng của người mình yêu quý.",
      action: "Ủng hộ và để người bạn đời có thời gian nghỉ ngơi hoặc làm điều họ thích."
    },
    {
      id: 207,
      name: "Lời Xin Lỗi Chân Thành",
      category: "love",
      desc: "Lời xin lỗi chân thành là chiếc chìa khóa hóa giải mọi bức tường ngăn cách.",
      action: "Chủ động làm hòa nếu có sự giận hờn, mở rộng trái tim tha thứ."
    },
    {
      id: 208,
      name: "Đồng Hành Qua Bão Giông",
      category: "discipline",
      desc: "Giá trị của hôn nhân được đo bằng sự vững vàng tay nắm tay qua những ngày gian khó.",
      action: "Nắm tay người bạn đời và nói: 'Có anh/em ở đây cùng vượt qua'."
    },
    {
      id: 209,
      name: "Biết Ơn Sự Hiện Diện",
      category: "love",
      desc: "Đừng coi những điều người thân làm cho bạn là hiển nhiên; hãy trân trọng mỗi ngày.",
      action: "Nói lời cảm ơn vì một việc rất nhỏ mà người ấy đã làm hôm nay."
    },
    {
      id: 210,
      name: "Trò Chuyện Trong Bình An",
      category: "wisdom",
      desc: "Cơn giận dữ chỉ làm cháy rụi tổ ấm; hãy đợi tâm lắng lại rồi cùng bàn bạc.",
      action: "Thở sâu và tạm hoãn tranh luận khi cảm thấy cảm xúc bắt đầu dâng trào."
    },
    {
      id: 211,
      name: "Chia Sẻ Gánh Nặng",
      category: "love",
      desc: "Gia đình là cùng nhau san sẻ, từ việc nhà giản dị đến nỗi lo toan cuộc sống.",
      action: "Chủ động chia sẻ một công việc nhà mà bạn ít khi làm."
    },
    {
      id: 212,
      name: "Bình Yên Sau Cánh Cửa",
      category: "flow",
      desc: "Hãy để những bực dọc bên ngoài cánh cửa trước khi bước vào tổ ấm yêu thương.",
      action: "Tươi cười chào đón gia đình khi bước qua cửa nhà hôm nay."
    }
  ],
  'nuoi-day-con': [
    {
      id: 301,
      name: "Làm Gương Hơn Lời Nói",
      category: "wisdom",
      desc: "Trẻ con không nghe những gì bạn nói, chúng quan sát những gì bạn làm mỗi ngày.",
      action: "Thực hiện đúng một hành động mẫu mực về sự tử tế trước mặt con hôm nay."
    },
    {
      id: 302,
      name: "Kiên Nhẫn Cùng Nhịp Điệu",
      category: "love",
      desc: "Mỗi đứa trẻ là một bông hoa có mùa nở riêng. Đừng so sánh con với người khác.",
      action: "Không so sánh con với bất kỳ ai hôm nay; ghi nhận nét riêng của con."
    },
    {
      id: 303,
      name: "Lắng Nghe Cảm Xúc Con",
      category: "love",
      desc: "Khi con tức giận hay khóc lóc, đó là lúc con cần tình yêu thương và sự thấu cảm nhất.",
      action: "Ngồi xuống ngang tầm mắt con và dịu dàng hỏi: 'Con đang cảm thấy thế nào?'."
    },
    {
      id: 304,
      name: "Khích Lệ Sự Nỗ Lực",
      category: "discipline",
      desc: "Khen ngợi sự cố gắng quý giá hơn nhiều so với việc chỉ khen điểm số hay tài năng.",
      action: "Ghi nhận sự chăm chỉ của con khi con hoàn thành một việc nhỏ."
    },
    {
      id: 305,
      name: "Rèn Luyện Tính Tự Lập",
      category: "wisdom",
      desc: "Món quà lớn nhất cha mẹ trao cho con là đôi cánh tự tin để tự bay trên đường đời.",
      action: "Để con tự tay làm một việc cá nhân hôm nay mà không làm thay con."
    },
    {
      id: 306,
      name: "Tình Thương Vô Điều Kiện",
      category: "love",
      desc: "Hãy để con biết rằng tình yêu của cha mẹ không phụ thuộc vào thành công hay sai lầm.",
      action: "Ôm con vào lòng và nói: 'Ba/Mẹ yêu con vì chính con'."
    },
    {
      id: 307,
      name: "Dạy Con Về Lòng Biết Ơn",
      category: "wisdom",
      desc: "Một đứa trẻ biết ơn sẽ luôn tìm thấy niềm vui và hạnh phúc trong cuộc sống.",
      action: "Cùng con kể ra 3 điều may mắn trong ngày trước giờ đi ngủ."
    },
    {
      id: 308,
      name: "Cho Con Quyền Được Sai",
      category: "love",
      desc: "Sai lầm là bài học tuyệt vời nhất để con trưởng thành, miễn là con được thấu hiểu.",
      action: "Bình tĩnh hướng dẫn khi con làm vỡ hoặc sai sót một việc, không quát mắng."
    },
    {
      id: 309,
      name: "Đồng Hành Thay Vì Áp Đặt",
      category: "wisdom",
      desc: "Làm bạn cùng con để con luôn có một nơi an toàn để tìm về khi gặp khó khăn.",
      action: "Dành 20 phút chơi trò con thích mà không can thiệp hay chỉ trích."
    },
    {
      id: 310,
      name: "Nuôi Dưỡng Trí Tò Mò",
      category: "wisdom",
      desc: "Đừng dập tắt những câu hỏi 'tại sao' của con bằng sự thiếu kiên nhẫn.",
      action: "Cùng con tìm hiểu câu trả lời cho một thắc mắc ngộ nghĩnh của con hôm nay."
    },
    {
      id: 311,
      name: "Giữ Lời Hứa Với Con",
      category: "discipline",
      desc: "Sự tôn trọng bắt đầu từ việc người lớn giữ trọn lời đã hứa với trẻ nhỏ.",
      action: "Thực hiện một lời hứa nhỏ mà bạn từng nói với con."
    },
    {
      id: 312,
      name: "Bình An Của Cha Mẹ",
      category: "flow",
      desc: "Cha mẹ bình an chính là môi trường giáo dục tuyệt vời nhất cho tâm hồn con.",
      action: "Dành 10 phút thư giãn bản thân để luôn có năng lượng tích cực bên con."
    }
  ],
  'suc-khoe-tinh-than': [
    {
      id: 501,
      name: "Thả Lỏng Toàn Thân",
      category: "flow",
      desc: "Cơ thể căng thẳng khi tâm trí bạn ôm đồm quá nhiều thứ không thuộc về hiện tại.",
      action: "Nhắm mắt, thả lỏng đôi vai, cơ hàm và thở dài nhẹ nhõm 3 lần."
    },
    {
      id: 502,
      name: "Chấp Nhận Cảm Xúc",
      category: "love",
      desc: "Bạn không cần phải luôn luôn vui vẻ; hãy cho phép mình được mệt mỏi đôi chút.",
      action: "Nhận diện nỗi buồn hay áp lực mà không tự trách móc bản thân."
    },
    {
      id: 503,
      name: "Ranh Giới Lành Mạnh",
      category: "wisdom",
      desc: "Nói 'không' với những điều vắt kiệt bạn là nói 'có' với sức khỏe tinh thần của mình.",
      action: "Từ chối khéo léo một yêu cầu làm bạn quá tải hôm nay."
    },
    {
      id: 504,
      name: "Trị Liệu Thiên Nhiên",
      category: "flow",
      desc: "Một cơn gió mát, một cành lá xanh có thể làm dịu đi những muộn phiền sâu kín.",
      action: "Dành 10 phút đi dạo dưới bóng cây hoặc hít thở khí trời trong lành."
    },
    {
      id: 505,
      name: "Giấc Ngủ An Yên",
      category: "flow",
      desc: "Giấc ngủ sâu là liều thuốc chữa lành kỳ diệu nhất mà tự nhiên trao tặng cho bạn.",
      action: "Tắt điện thoại trước khi ngủ 30 phút, ngâm chân nước ấm hoặc nghe nhạc lofi."
    },
    {
      id: 506,
      name: "Buông Bỏ Hoàn Hảo",
      category: "wisdom",
      desc: "Hoàn hảo là ảo tưởng ngăn cản bạn tận hưởng sự bình dị đẹp đẽ của cuộc sống.",
      action: "Cho phép mọi thứ ở mức 'đủ tốt' và mỉm cười thanh thản."
    },
    {
      id: 507,
      name: "Thanh Lọc Năng Lượng",
      category: "wisdom",
      desc: "Tránh xa những cuộc tranh cãi vô bổ và luồng tin tức độc hại để bảo vệ tâm trí.",
      action: "Không bấm vào những tin tức tiêu cực hay tranh cãi trên mạng xã hội."
    },
    {
      id: 508,
      name: "Nuông Chiều Bản Thân",
      category: "love",
      desc: "Bạn đã chăm sóc người khác nhiều rồi, hôm nay hãy chăm sóc chính bản thân bạn.",
      action: "Thưởng cho mình một tách trà ấm, một món ăn ngon hoặc bài nhạc ưa thích."
    },
    {
      id: 509,
      name: "Chiếc Mỏ Neo Hơi Thở",
      category: "flow",
      desc: "Hơi thở là chiếc mỏ neo kéo tâm trí đang trôi dạt trở về với sự an trú nguyên bản.",
      action: "Thực hành bài tập thở 4-7-8 ba lần trong ngày khi thấy căng thẳng."
    },
    {
      id: 510,
      name: "Tự Nhủ Lời Yêu Thương",
      category: "love",
      desc: "Tiếng nói nội tâm đang đối xử với bạn như một người bạn tri kỷ hay một quan tòa?",
      action: "Tự nói với chính mình: 'Tôi đã làm hết sức và tôi xứng đáng được bình yên'."
    },
    {
      id: 511,
      name: "Viết Ra Để Buông Bỏ",
      category: "wisdom",
      desc: "Khi tâm trí rối bời, hãy đưa những suy nghĩ đó lên từng trang giấy để giải tỏa.",
      action: "Viết ra tất cả những lo lắng vào một trang nhật ký rồi khép lại bình an."
    },
    {
      id: 512,
      name: "Bình Tâm Đón Nhận",
      category: "flow",
      desc: "Mọi cơn bão rồi cũng sẽ qua đi, bầu trời sau mưa rồi sẽ lại trong xanh thanh tịnh.",
      action: "Nhắc nhở bản thân: 'Điều này rồi cũng sẽ qua, mình luôn an toàn'."
    }
  ],
  'tam-linh': [
    {
      id: 601,
      name: "Sống Thuận Dòng Tự Nhiên",
      category: "flow",
      desc: "Dòng nước mềm mại nhất nhưng có thể bào mòn cả đá tảng; hãy sống mềm mại thuận dòng.",
      action: "Không cố gắng kiểm soát mọi diễn biến hôm nay; để vạn sự tùy duyên."
    },
    {
      id: 602,
      name: "Kết Nối Nguồn Cội",
      category: "wisdom",
      desc: "Bạn không phải là một giọt nước riêng lẻ, bạn là cả đại dương trong một giọt nước.",
      action: "Dành 10 phút ngồi thiền tĩnh lặng, cảm nhận sự sống tràn ngập trong từng tế bào."
    },
    {
      id: 603,
      name: "Luật Nhân Quả Vi Diệu",
      category: "wisdom",
      desc: "Mỗi ý niệm tốt lành bạn phát ra hôm nay là một đóa hoa thơm nở rộ trong tương lai.",
      action: "Gửi lời chúc phúc thầm lặng đến tất cả những người bạn tình cờ gặp gỡ."
    },
    {
      id: 604,
      name: "Thức Tỉnh Hiện Tại",
      category: "wisdom",
      desc: "Quá khứ là ký ức, tương lai là tưởng tượng; chỉ có giây phút này là có thật và nhiệm màu.",
      action: "Thực hành chánh niệm trọn vẹn trong một bữa ăn hoặc một ngụm trà sớm."
    },
    {
      id: 605,
      name: "Trái Tim Từ Bi",
      category: "love",
      desc: "Từ bi không làm bạn yếu đuối, từ bi là sức mạnh chuyển hóa lớn nhất của vũ trụ.",
      action: "Mở rộng lòng tha thứ cho một người từng làm bạn phật ý trong quá khứ."
    },
    {
      id: 606,
      name: "Ánh Sáng Trí Huệ",
      category: "wisdom",
      desc: "Bóng tối không thể xua đi bóng tối, chỉ có ánh sáng của trí tuệ mới làm được điều đó.",
      action: "Nhìn vào khía cạnh bài học tích cực ẩn giấu sau một biến cố vừa qua."
    },
    {
      id: 607,
      name: "Tần Số Rung Động Thuần Khiết",
      category: "flow",
      desc: "Nâng cao năng lượng của bạn bằng sự thuần khiết, biết ơn và thanh thản nội tâm.",
      action: "Nói lời biết ơn cuộc đời mỗi sáng thức dậy và tối trước khi ngủ."
    },
    {
      id: 608,
      name: "Duyên Khởi & Buông Xả",
      category: "flow",
      desc: "Vạn vật đến do duyên và đi cũng do duyên; an nhiên mỉm cười trước mọi hợp tan.",
      action: "Buông bỏ một sự níu kéo trong tâm trí về một điều không thể thay đổi."
    },
    {
      id: 609,
      name: "Sự Thiêng Liêng Vạn Vật",
      category: "flow",
      desc: "Mỗi nhành cây, ngọn cỏ, giọt sương đều mang trong mình sự sống thiêng liêng nhiệm màu.",
      action: "Chạm nhẹ vào một chiếc lá cây và cảm nhận sự kỳ diệu của mẹ thiên nhiên."
    },
    {
      id: 610,
      name: "Lắng Nghe Trực Giác",
      category: "wisdom",
      desc: "Khi tâm trí hoàn toàn tĩnh lặng, tiếng nói linh thiêng sâu thẳm bên trong sẽ cất lời.",
      action: "Dành một khoảng lặng lắng nghe trực giác trước khi quyết định việc quan trọng."
    },
    {
      id: 611,
      name: "Vô Ngã & Tự Tại",
      category: "wisdom",
      desc: "Càng bớt bám chấp vào cái 'tôi' bé nhỏ, bạn càng hòa nhập vào sự rộng lớn tự do.",
      action: "Lắng nghe quan điểm của người khác mà không cần phải chứng minh mình đúng."
    },
    {
      id: 612,
      name: "Viên Mãn Trong Tâm",
      category: "flow",
      desc: "Hạnh phúc không nằm ở những gì bạn tích lũy, mà ở sự viên mãn tròn đầy trong tâm hồn.",
      action: "Cảm nhận sự đủ đầy của giây phút hiện tại, tâm không còn mong cầu thêm."
    }
  ],
  'tien-hon-nhan': [
    {
      id: 701,
      name: "Yêu Tỉnh Thức Không Mù Quáng",
      category: "love",
      desc: "Tình yêu chân thực là nhìn rõ cả ưu và khuyết điểm nhưng vẫn chọn thấu hiểu đồng hành.",
      action: "Ngồi lại viết ra những giá trị cốt lõi bạn tìm kiếm ở người bạn đời tương lai."
    },
    {
      id: 702,
      name: "Hòa Hợp Giá Trị Sống",
      category: "wisdom",
      desc: "Hôn nhân bền vững xây dựng trên sự đồng điệu về nhân sinh quan và lý tưởng sống.",
      action: "Cùng người yêu thảo luận cởi mở về quan điểm gia đình và mục tiêu cuộc đời."
    },
    {
      id: 703,
      name: "Minh Bạch Về Tài Chính",
      category: "discipline",
      desc: "Tình yêu lãng mạn nhưng hôn nhân thực tế; hãy rõ ràng về tài chính ngay từ trước.",
      action: "Thẳng thắn chia sẻ về thói quen chi tiêu và kế hoạch tích lũy dài hạn cùng nhau."
    },
    {
      id: 704,
      name: "Nhận Diện Khác Biệt",
      category: "wisdom",
      desc: "Đừng lờ đi những bất đồng căn bản chỉ vì hy vọng hôn nhân sẽ tự thay đổi đối phương.",
      action: "Can đảm nhìn nhận thẳng thắn những điểm chưa tương thích để cùng đối thoại."
    },
    {
      id: 705,
      name: "Sự Độc Lập Trước Khi Gắn Kết",
      category: "wisdom",
      desc: "Hai cái cây đứng vững chãi mới tạo nên khu rừng đẹp; đừng biến mình thành tầm gửi.",
      action: "Vun bồi sự tự chủ về cảm xúc, công việc và cuộc sống của riêng bạn."
    },
    {
      id: 706,
      name: "Văn Hóa Giải Quyết Xung Đột",
      category: "love",
      desc: "Cách hai người tranh cãi và làm hòa trước hôn nhân sẽ dự báo tương lai tổ ấm.",
      action: "Học cách hạ cái tôi khi có bất đồng, tập trung giải quyết vấn đề thay vì công kích."
    },
    {
      id: 707,
      name: "Tôn Trọng Gia Đình Hai Bên",
      category: "love",
      desc: "Hôn nhân là sự kết nối của hai dòng họ; sự hòa hợp cần sự tôn trọng chân thành.",
      action: "Gửi lời hỏi thăm chu đáo đến phụ huynh hoặc người thân của người yêu."
    },
    {
      id: 708,
      name: "Trách Nhiệm & Sự Cam Kết",
      category: "discipline",
      desc: "Cam kết là chọn yêu người ấy ngay cả trong những ngày cảm xúc lãng mạn lắng xuống.",
      action: "Khẳng định sự nghiêm túc và niềm tin vững chắc vào tương lai chung của hai người."
    },
    {
      id: 709,
      name: "Đồng Nhất Quan Điểm Con Cái",
      category: "wisdom",
      desc: "Nuôi dạy con cái là trách nhiệm thiêng liêng cần sự thống nhất tư tưởng từ sớm.",
      action: "Trao đổi chân thành về mong muốn sinh con và phương pháp giáo dục trong tương lai."
    },
    {
      id: 710,
      name: "Không Đánh Mất Chính Mình",
      category: "wisdom",
      desc: "Một tình yêu lành mạnh sẽ làm bạn tỏa sáng hơn chứ không làm mờ đi bản sắc của bạn.",
      action: "Duy trì sở thích cá nhân và những mối quan hệ bạn bè tích cực của bạn."
    },
    {
      id: 711,
      name: "Thấu Hiểu Ngôn Ngữ Tình Yêu",
      category: "love",
      desc: "Mỗi người có một cách cảm nhận tình yêu khác nhau; hãy học ngôn ngữ của người ấy.",
      action: "Hỏi người ấy xem điều gì làm họ cảm thấy được yêu thương và trân trọng nhất."
    },
    {
      id: 712,
      name: "Chuẩn Bị Tâm Thế Vững Vàng",
      category: "flow",
      desc: "Hôn nhân không phải là đích đến, mà là điểm khởi đầu cho hành trình trưởng thành chung.",
      action: "Đọc một cuốn sách tâm lý hôn nhân bổ ích hoặc tham gia buổi chia sẻ bổ ích."
    }
  ]
};

const TOPICS = {
  'su-nghiep': {
    id: 'su-nghiep',
    num: 1,
    name: 'Phát Triển Sự Nghiệp',
    shortName: 'Sự Nghiệp',
    colorName: 'Màu Đỏ',
    color: '#DC2626',
    secondaryColor: '#EF4444',
    lightBg: '#FEF2F2',
    accentGradient: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #EF4444 100%)',
    glowColor: 'rgba(220, 38, 38, 0.45)',
    icon: 'compass',
    tagline: 'Kỷ luật, bứt phá giới hạn và vươn tới đỉnh cao sự nghiệp',
    description: 'Trạm năng lượng hành động giúp bạn củng cố bản lĩnh lãnh đạo, quản trị thời gian, kiên định mục tiêu và tạo ra những thành tựu vượt bậc.',
    runes: ['⚡', '🎯', '🔥', '🦁', '👑', '🚀', '🏆', '💎', '🏔️', '⚔️', '🏹', '🌟'],
    segmentLabels: ['BỨT PHÁ', 'KỶ LUẬT', 'MỤC TIÊU', 'DẪN ĐẦU', 'BẢN LĨNH', 'TẬP TRUNG', 'HÀNH ĐỘNG', 'KIÊN ĐỊNH', 'ĐỘT PHÁ', 'CHIẾN LƯỢC', 'SÁNG TẠO', 'VINH QUANG'],
    totalCards: 12,
    hasCustomImages: false,
    messages: TOPIC_SEED_MESSAGES['su-nghiep']
  },
  'hon-nhan': {
    id: 'hon-nhan',
    num: 2,
    name: 'Hôn Nhân Gia Đình',
    shortName: 'Hôn Nhân',
    colorName: 'Màu Cam',
    color: '#EA580C',
    secondaryColor: '#F97316',
    lightBg: '#FFF7ED',
    accentGradient: 'linear-gradient(135deg, #EA580C 0%, #C2410C 50%, #F97316 100%)',
    glowColor: 'rgba(234, 88, 12, 0.45)',
    icon: 'heart',
    tagline: 'Gắn kết yêu thương, thấu hiểu và cùng nhau xây đắp tổ ấm',
    description: 'Chỉ dẫn tâm lý giúp các cặp đôi vượt qua bất đồng, học cách lắng nghe bao dung và vun đắp ngọn lửa hạnh phúc gia đình bền chặt.',
    runes: ['☀️', '🕊️', '🌿', '🧡', '🏡', '🤝', '🕯️', '🌸', '💫', '🌻', '🎁', '💖'],
    segmentLabels: ['GẮN KẾT', 'THẤU HIỂU', 'LẮNG NGHE', 'ẤM ÁP', 'BAO DUNG', 'BÌNH YÊN', 'CHÂN THÀNH', 'ĐỒNG HÀNH', 'CHIA SẺ', 'TÔN TRỌNG', 'HÒA HỢP', 'TỔ ẤM'],
    totalCards: 12,
    hasCustomImages: false,
    messages: TOPIC_SEED_MESSAGES['hon-nhan']
  },
  'nuoi-day-con': {
    id: 'nuoi-day-con',
    num: 3,
    name: 'Nuôi Dạy Con Cái',
    shortName: 'Nuôi Dạy Con',
    colorName: 'Màu Xanh Lá',
    color: '#16A34A',
    secondaryColor: '#22C55E',
    lightBg: '#F0FDF4',
    accentGradient: 'linear-gradient(135deg, #16A34A 0%, #15803D 50%, #22C55E 100%)',
    glowColor: 'rgba(22, 163, 74, 0.45)',
    icon: 'sparkles',
    tagline: 'Khai phóng tiềm năng, kiên nhẫn làm gương và bầu bạn cùng con',
    description: 'Kho tàng thấu cảm tâm lý trẻ em từ TS. Sunny Đặng Phương, giúp cha mẹ nuôi dạy con bằng sự kiên nhẫn, yêu thương và trí tuệ.',
    runes: ['🌱', '🌳', '🕊️', '🎨', '🧩', '🎈', '☀️', '⭐', '🌈', '🌻', '📚', '🤍'],
    segmentLabels: ['KIÊN NHẪN', 'LÀM GƯƠNG', 'YÊU THƯƠNG', 'KHÍCH LỆ', 'THẤU CẢM', 'LẮNG NGHE', 'ĐỒNG HÀNH', 'TỰ LẬP', 'TIN TƯỞNG', 'VUN BỒI', 'TRÍ TUỆ', 'BẢO BỌC'],
    totalCards: 12,
    hasCustomImages: false,
    messages: TOPIC_SEED_MESSAGES['nuoi-day-con']
  },
  'tri-tam-khai-sang': {
    id: 'tri-tam-khai-sang',
    num: 4,
    name: 'Trí Tâm Khai Sáng',
    shortName: 'Khai Sáng',
    colorName: 'Màu Lam Ngọc',
    color: '#0D9488',
    secondaryColor: '#14B8A6',
    lightBg: '#F0FDFA',
    accentGradient: 'linear-gradient(135deg, #0D9488 0%, #0F766E 50%, #14B8A6 100%)',
    glowColor: 'rgba(13, 148, 136, 0.45)',
    icon: 'astrolabe',
    tagline: '66 Hạt mầm tâm thức thức tỉnh trí tuệ và an trú hiện tại',
    description: 'Bộ sưu tập 66 thông điệp khai sáng trọn vẹn của TS. Sunny Đặng Phương với tranh vẽ nghệ thuật, soi sáng tâm thức mỗi ngày.',
    runes: ['✦', '✧', '★', '❂', '✺', '🜂', '🜁', '🜄', '🜃', '☼', '☽', '∞'],
    segmentLabels: ['BÌNH AN', 'TRÍ TUỆ', 'HY VỌNG', 'CHỮA LÀNH', 'DỒI DÀO', 'TÌNH YÊU', 'KỶ LUẬT', 'BỀN BỈ', 'KHAI SÁNG', 'CHÁNH NIỆM', 'THONG DONG', 'PHÚC LẠC'],
    totalCards: 66,
    hasCustomImages: true,
    messages: MESSAGES
  },
  'suc-khoe-tinh-than': {
    id: 'suc-khoe-tinh-than',
    num: 5,
    name: 'Sức Khỏe Tinh Thần',
    shortName: 'Tinh Thần',
    colorName: 'Màu Chàm',
    color: '#4F46E5',
    secondaryColor: '#6366F1',
    lightBg: '#EEF2FF',
    accentGradient: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 50%, #6366F1 100%)',
    glowColor: 'rgba(79, 70, 229, 0.45)',
    icon: 'feather',
    tagline: 'Giải phóng âu lo, chữa lành tổn thương và tìm lại sự cân bằng',
    description: 'Trạm sơ cứu và dưỡng tâm dành cho những ngày căng thẳng mỏi mệt, tiếp thêm sức mạnh nội tại để bạn mỉm cười bước tiếp.',
    runes: ['🌊', '🕊️', '🌿', '💧', '🪷', '🌙', '🌌', '✨', '🍃', '🫧', '🕯️', '💜'],
    segmentLabels: ['CHỮA LÀNH', 'AN YÊN', 'BUÔNG THƯ', 'TỰ TẠI', 'THỞ SÂU', 'BÌNH TÂM', 'GIẢI THOÁT', 'NỘI LỰC', 'DỊU DÀNG', 'PHỤC HỒI', 'THANH LỌC', 'VẸN NGUYÊN'],
    totalCards: 12,
    hasCustomImages: false,
    messages: TOPIC_SEED_MESSAGES['suc-khoe-tinh-than']
  },
  'tam-linh': {
    id: 'tam-linh',
    num: 6,
    name: 'Phát Triển Tâm Linh',
    shortName: 'Tâm Linh',
    colorName: 'Màu Gold',
    color: '#D97706',
    secondaryColor: '#F59E0B',
    lightBg: '#FFFBEB',
    accentGradient: 'linear-gradient(135deg, #D97706 0%, #B45309 50%, #F59E0B 100%)',
    glowColor: 'rgba(217, 119, 6, 0.45)',
    icon: 'crown',
    tagline: 'Kết nối vũ trụ, thiền định thâm sâu và sống thuận dòng nhân quả',
    description: 'Nâng cao tần số rung động tâm thức, cảm nhận sự kết nối màu nhiệm giữa bản thể với thiên nhiên và trật tự vĩ đại của vũ trụ.',
    runes: ['☀️', '⚡', '🌌', '🕉️', '☸️', '☸', '✺', '⚜️', '🪐', '💫', '🪷', '♾️'],
    segmentLabels: ['THUẬN DÒNG', 'THỨC TỈNH', 'TỰ TẠI', 'KẾT NỐI', 'VÔ LƯỢNG', 'BỒ ĐỀ', 'TỪ BI', 'LINH ỨNG', 'NHÂN DUYÊN', 'ÁNH SÁNG', 'HUYỀN DIỆU', 'VIÊN MÃN'],
    totalCards: 12,
    hasCustomImages: false,
    messages: TOPIC_SEED_MESSAGES['tam-linh']
  },
  'tien-hon-nhan': {
    id: 'tien-hon-nhan',
    num: 7,
    name: 'Yêu - Tiền Hôn Nhân',
    shortName: 'Tiền Hôn Nhân',
    colorName: 'Màu Tím',
    color: '#9333EA',
    secondaryColor: '#A855F7',
    lightBg: '#FAF5FF',
    accentGradient: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 50%, #A855F7 100%)',
    glowColor: 'rgba(147, 51, 234, 0.45)',
    icon: 'heart',
    tagline: 'Tình yêu tỉnh thức, hòa hợp giá trị sống và chuẩn bị cho hôn nhân',
    description: 'Kim chỉ nam trước ngưỡng cửa hôn nhân: Nhận diện người đồng hành phù hợp, chuẩn bị tâm lý, tài chính và xây nền móng vững chắc cho tình yêu.',
    runes: ['💎', '💍', '🕊️', '🔮', '💜', '🌸', '✨', '🤝', '🥂', '💌', '🌹', '♾️'],
    segmentLabels: ['TỈNH THỨC', 'HÒA HỢP', 'ĐỒNG ĐIỆU', 'CAM KẾT', 'CHÂN THÀNH', 'NGUYÊN BẢN', 'TRÂN QUÝ', 'THẤU SUỐT', 'SẴN SÀNG', 'CHIA SẺ', 'TRAO GỞI', 'HẠNH PHÚC'],
    totalCards: 12,
    hasCustomImages: false,
    messages: TOPIC_SEED_MESSAGES['tien-hon-nhan']
  }
};

const TOPIC_LIST = [
  TOPICS['su-nghiep'],
  TOPICS['hon-nhan'],
  TOPICS['nuoi-day-con'],
  TOPICS['tri-tam-khai-sang'],
  TOPICS['suc-khoe-tinh-than'],
  TOPICS['tam-linh'],
  TOPICS['tien-hon-nhan']
];

// Topic Helpers
function getAllTopics() {
  return TOPIC_LIST;
}

function getTopic(idOrNum) {
  if (!idOrNum) return TOPICS['tri-tam-khai-sang'];
  const s = String(idOrNum).toLowerCase().trim();
  if (TOPICS[s]) return TOPICS[s];
  // Check alias or number
  if (s === '1' || s.includes('su-nghiep') || s.includes('nghiep')) return TOPICS['su-nghiep'];
  if (s === '2' || s.includes('hon-nhan') || s.includes('gia-dinh')) return TOPICS['hon-nhan'];
  if (s === '3' || s.includes('nuoi-day') || s.includes('con-cai')) return TOPICS['nuoi-day-con'];
  if (s === '4' || s.includes('khai-sang') || s.includes('tri-tam')) return TOPICS['tri-tam-khai-sang'];
  if (s === '5' || s.includes('suc-khoe') || s.includes('tinh-than')) return TOPICS['suc-khoe-tinh-than'];
  if (s === '6' || s.includes('tam-linh')) return TOPICS['tam-linh'];
  if (s === '7' || s.includes('tien-hon-nhan') || s.includes('yeu')) return TOPICS['tien-hon-nhan'];
  return TOPICS['tri-tam-khai-sang'];
}

function getCurrentTopic() {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const topicParam = params.get('topic');
    if (topicParam) {
      const topic = getTopic(topicParam);
      if (topic) {
        try { localStorage.setItem('vqtd_selected_topic', topic.id); } catch (_) {}
        return topic;
      }
    }
    try {
      const saved = localStorage.getItem('vqtd_selected_topic');
      if (saved) return getTopic(saved);
    } catch (_) {}
  }
  return TOPICS['tri-tam-khai-sang'];
}

function setCurrentTopic(topicId) {
  const topic = getTopic(topicId);
  if (typeof window !== 'undefined') {
    try { localStorage.setItem('vqtd_selected_topic', topic.id); } catch (_) {}
  }
  return topic;
}

function getMessagesForTopic(topicId) {
  const topic = getTopic(topicId);
  return topic ? topic.messages : MESSAGES;
}

// Helpers Override
function getMessageById(id, topicId) {
  const numId = Number(id);
  if (topicId) {
    const topic = getTopic(topicId);
    if (topic) {
      const found = topic.messages.find(m => m.id === numId);
      if (found) return found;
    }
  }
  // Try current active topic
  const currentTopic = getCurrentTopic();
  const inCurrent = currentTopic.messages.find(m => m.id === numId);
  if (inCurrent) return inCurrent;

  // Search across all topics
  for (const t of TOPIC_LIST) {
    const found = t.messages.find(m => m.id === numId);
    if (found) return found;
  }
  return MESSAGES.find(m => m.id === numId) || null;
}

function getMessagesByCategory(catId, topicId) {
  const list = topicId ? getMessagesForTopic(topicId) : getCurrentTopic().messages;
  if (!catId || catId === 'all') return list;
  return list.filter(m => m.category === catId);
}

function getRandomMessage(topicId) {
  const list = topicId ? getMessagesForTopic(topicId) : getCurrentTopic().messages;
  if (!list || list.length === 0) return MESSAGES[0];
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
}

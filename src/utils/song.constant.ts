export const musicGenres = [
    {
      title: "Pop",
      description: "Nhạc phổ thông, dễ nghe, thường có giai điệu catchy và lời bài hát đơn giản."
    },
    {
      title: "Rock",
      description: "Nhạc dựa trên guitar điện, trống, và năng lượng mạnh mẽ."
    },
    {
      title: "Hip Hop",
      description: "Thể loại tập trung vào rap, beat và văn hóa đường phố."
    },
    {
      title: "Jazz",
      description: "Nhạc ngẫu hứng với cấu trúc phức tạp, thường sử dụng saxophone, piano, và kèn."
    },
    {
      title: "Classical",
      description: "Nhạc cổ điển châu Âu, thường được sáng tác cho dàn nhạc giao hưởng hoặc nhạc cụ solo."
    },
    {
      title: "Electronic",
      description: "Nhạc sử dụng công nghệ điện tử và synthesizer để tạo âm thanh."
    },
    {
      title: "R&B",
      description: "Rhythm and Blues, tập trung vào giọng hát cảm xúc và nhịp điệu."
    },
    {
      title: "Country",
      description: "Nhạc dân gian Mỹ, thường kể chuyện với guitar và giọng hát đặc trưng."
    },
    {
      title: "Reggae",
      description: "Nhạc bắt nguồn từ Jamaica, nhấn mạnh vào nhịp điệu offbeat."
    },
    {
      title: "Metal",
      description: "Nhạc rock nặng, với guitar điện mạnh mẽ và vocal dữ dội."
    },
    {
      title: "Folk",
      description: "Nhạc dân gian, thường sử dụng nhạc cụ acoustic và kể chuyện."
    },
    {
      title: "Blues",
      description: "Nhạc tập trung vào cảm xúc sâu sắc, thường sử dụng guitar và harmonica."
    },
    {
      title: "World",
      description: "Nhạc từ các nền văn hóa toàn cầu, không thuộc các thể loại phương Tây."
    },
    {
      title: "Indie",
      description: "Nhạc độc lập, thường được sản xuất ngoài các hãng thu âm lớn."
    },
    {
      title: "Punk",
      description: "Nhạc nổi loạn, nhanh, đơn giản, với thái độ chống đối."
    }
  ];
  
// Định dạng thời gian mm:ss
export  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.ceil(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};
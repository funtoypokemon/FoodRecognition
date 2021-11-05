
import numpy as np
import os
import os.path
from tensorflow import keras
# import keras_applications
import cv2
from tensorflow.keras.models import load_model
import sys
# from tensorflow.keras.utils.generic_utils import CustomObjectScope
# from tensorflow.keras.applications import MobileNet

from tensorflow.keras import backend
backend.clear_session()

data_dir = './data'
# def get_food_prediction(data_dir):


model_path = os.path.join(data_dir, 'mobilenetv2_weights_mc.h5')


# with CustomObjectScope({'relu6': keras.applications.mobilenet.relu6,'DepthwiseConv2D': keras.applications.mobilenet.DepthwiseConv2D}):
#     model = load_model(model_path)




model = load_model(model_path)

classes = ['Bánh Mì', 'Donuts', 'Dumplings', 'Gỏi Cuốn', 'Seaweed Salad', 'Waffles']
description = [
   'Bánh mì là một món ăn của Việt Nam, bao gồm vỏ là một ổ bánh mì nướng có da giòn, ruột mềm, bên trong là phần nhân. Tùy theo hương vị vùng miền hoặc sở thích cá nhân mà người ta chế biến thành những kiểu nhân khác nhau, thường là chả lụa, thịt, cá, thực phẩm chay hoặc mứt trái cây, kèm theo một số nguyên liệu phụ khác như patê, bơ, rau, ớt và đồ chua. Bánh mì được xem như một loại thức ăn nhanh bình dân và thường được tiêu thụ trong bữa sáng hoặc bất kỳ bữa phụ nào trong ngày. Do có giá thành phù hợp nên bánh mì trở thành món ăn được rất nhiều người ưa chuộng.',
   'Donuts là một loại bánh ngọt rán hoặc nướng để ăn tráng miệng hay ăn vặt. Đây là loại bánh rất nổi tiếng và phổ biến ở nhiều nước phương Tây, có thể được mua trong cửa hàng hoặc tự làm ở nhà. Thường bánh có dạng hình vòng nhồi nhân bên trong hoặc không nhồi nhân bên trong. Bánh thường được phủ nhiều loại kem socola và trang trí bằng hạt đường, hạt cốm...',
   'Dumplings là một loại bánh hấp của Trung Quốc phổ biến ở khu vực Đông Á . Đây là một trong những món ăn chính trong dịp Tết nguyên đán cũng như là món ăn quanh năm tại các tỉnh phía Bắc Trung Quốc.Được coi là một phần của ẩm thực Trung Hoa, sủi cảo còn phổ biến ở nhiều khu vực khác của Châu Á và các nước phương Tây . Sủi cảo thường bao gồm thịt nghiền hoặc rau chất đầy và cuốn trong một miếng bột bánh mỏng,sau đó được ép chặt lại bằng cách nhấn mạnh các góc bánh vào nhau hoặc xếp thành nếp.',
   'Gỏi cuốn là một món ăn khá phổ biến ở Việt Nam. Gỏi cuốn có xuất xứ từ Miền nam Việt Nam với tên gọi là gỏi cuốn bằng các nguyên liệu gồm rau xà lách, húng quế, tía tô, tôm khô, rau thơm, thịt luộc, tôm tươi.. tất cả được cuộn trong vỏ bánh tráng. Gia vị dùng kèm là tương hột trộn với lạc rang giã nhỏ phi bằng dầu ăn với hành khô.... tất cả thái nhỏ và cuộn trong vỏ làm từ bột mì. Gia vị dùng kèm là tương ớt trộn với lạc rang giã nhỏ phi bằng dầu ăn với hành khô. Món ăn này phổ biển ở Việt Nam chủ yếu dùng bánh tráng được cuốn với nhiều thành phần khác nhau tùy từng vùng miền, thường dùng để khai vị hay ăn kèm cùng đồ uống như một món nhậu, được làm từ bánh tráng cuộn với các loại rau thơm, bún, và một số loại thịt như thịt bò, heo, vịt, tôm, cá, cua, v.v',
   'Seaweed Salad là một món ăn có từ lâu đời của người Nhật Bản. Người dân Nhật Bản đã phát hiện ra những lợi ích tuyệt vời của rong biển đối với sức khỏe con người cho nên gỏi rong biển dần được đón nhận và trở nên phổ biến ở Nhật nói riêng và toàn thế giới nói chung. Gỏi rong biển thường được tạo nên nhờ sự kết hợp giữa rong biển, hạt và dầu mè, cùng một ít giấm gạo. Công thức mặc dù đơn giản nhưng đã mang lại một hương vị cực kỳ đặc biệt và đã được lưu truyền cho đến tận ngày nay.',
   'Waffles có nguồn gốc xuất xứ từ Bỉ, là món ăn truyền thống và niềm tự hào về văn hóa ẩm thực, đặc biệt là ẩm thực đường phố của Bỉ. Ngày nay, bánh Waffle đã phổ biến trên khắp thế giới với nhiều hình dáng và biến tấu khác nhau tùy vào văn hóa in trên vỉ nướng. Bánh waffle được tạo nên từ bột bánh hoặc bột nhào. Ở Việt Nam, bánh Waffle thường được gọi với tên là bánh tổ ong hay bánh kẹp.'
]

image_folder = os.path.join(data_dir, 'demo_imgs')
demo_imgs = os.listdir(image_folder)
demo_files = demo_imgs
for img_file in demo_files:
   image_path = os.path.join(image_folder, img_file)
   image = cv2.imread(image_path)
   image = cv2.resize(image,(224, 224))
   image = image.astype('float') * 1./255
   image = np.expand_dims(image, axis=0)
   predictions = np.argmax(model.predict(image))
   recipeName = classes[predictions]
   recipeDesc = description[predictions]

   recipe = {
      "title": recipeName,
      "description": recipeDesc

   }
   # print("This picture is: ", recipeName)
   print(recipe)
   print("\n")
   print("\n")

    
    
json.(@message, :content, :image)
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
jons.user_name  @message.user.user_name
json.id         @message.id


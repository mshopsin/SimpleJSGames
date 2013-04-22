class ToDoItemsController < ApplicationController
  def index
    respond_to do |format|
      format.html { render :index }
      format.json { render :json => ToDoItem.all }
    end
  end

  def create
    @todoitem = ToDoItem.create!(params[:todoitem])
    respond_to do |format|
      format.json { render :json => @todoitem }
    end
  end

  def destroy
    ToDoItem.find(params[:id]).destroy
    render :nothing => true
  end

  def update
    puts "begin"
    p params
    puts "end"
    @todoitem = ToDoItem.find(params[:id])
    @todoitem.update_attributes(params[:todoitem])
    @todoitem.save
    respond_to do |format|
      format.json { render :json => @todoitem }
    end
  end

end

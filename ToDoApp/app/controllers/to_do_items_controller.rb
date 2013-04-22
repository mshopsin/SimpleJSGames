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
    @todoitem = ToDoItem.find(params[:id])
    @todoitem.update_attributes(params[:todoitem])
    @todoitem.save
  end

end

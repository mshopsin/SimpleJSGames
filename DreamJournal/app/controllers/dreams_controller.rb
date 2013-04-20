class DreamsController < ApplicationController
  def create
    @dream = Dream.create!(params[:dream])

    respond_to do |format|
      format.json { render :json => @dream }
    end
  end

  def index
    respond_to do |format|
      format.html { render :index }
      format.json { render :json => Dream.all }
    end
  end
end

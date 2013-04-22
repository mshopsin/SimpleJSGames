class DreamThemesController < ApplicationController
  def create
    @dreamtheme = DreamTheme.create!(params[:dreamtheme])
    respond_to do |format|
      format.json { render :json => @dreamtheme }
    end
  end
end

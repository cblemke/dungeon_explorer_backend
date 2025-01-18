import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ForkEvent, ForkType } from './events/forkEvent';

@Controller('event/fork')
export class ForkEventController {

    
    private events: { [id: string]: ForkEvent } = {}; // Almacenar eventos en memoria para la prueba

    @Get('init')
    initForkEvent() {  
        console.log(`se ha iniciado un nuevo evento tipo "bifurcación". El jugador debe elegir un camino.`)
        const event = new ForkEvent();
        const eventId = `${event.step}-${Date.now()}`; // Generar un ID único
        this.events[eventId] = event;  

        return {
            id: eventId,
            type: event.forkType,
            numberOfPaths: event.forkType === ForkType.TwoWays ? 2 : 3,
            descripcion: `estás ante una bifurcación de ${ForkType.TwoWays ? 2 : 3} caminos... ¿cuál eligirás?`
        };
        
    }

  
  
    @Post('resolve/:id')
    resolveForkEvent(@Param('id') id: string, @Body() body: { playerChoice: number }) {
      const event = this.events[id];
  
      if (!event) {
        return { message: 'Evento no encontrado.' };
      }

      if (event.isCompleted) {
        return { message: 'El evento se ha completado y no se puede repetir' };
      }
  
      const result = event.resolve(body.playerChoice);
  
     
      
      return {
        message: result,
        isCompleted: event.isCompleted,
      }; 
    }    
}
